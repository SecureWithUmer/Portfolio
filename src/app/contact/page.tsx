"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialState: ContactFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        // Consider resetting the form here if useForm hook was used
        // For server actions with useFormState, manual reset is needed or redirect.
      } else if (state.issues && state.issues.length > 0) {
        state.issues.forEach(issue => {
          toast({
            title: "Validation Error",
            description: issue,
            variant: "destructive",
          });
        });
      } else if(!state.success && state.message) {
         toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
          });
      }
    }
  }, [state, toast]);


  return (
    <div className="space-y-12">
      <PageTitle subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.">
        Get In Touch
      </PageTitle>
      
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required defaultValue={state.fields?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required defaultValue={state.fields?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="Subject of your message" required defaultValue={state.fields?.subject} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your detailed message..." rows={5} required defaultValue={state.fields?.message} />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
