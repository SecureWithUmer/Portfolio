
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Umer Farooq | Get In Touch',
  description: 'Connect with Umer Farooq (SecureWithUmer) on LinkedIn, GitHub, or via email for collaborations, projects, or cybersecurity discussions.',
};

const contactMethods = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hackandsecurewithumer",
    icon: Linkedin,
    username: "@hackandsecurewithumer",
    external: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/SecureWithUmer",
    icon: Github,
    username: "@SecureWithUmer",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:hackwithumer@outlook.com",
    icon: Mail,
    username: "hackwithumer@outlook.com",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <PageTitle subtitle="Let's connect! Find me on these platforms or send me an email.">
        Get In Touch
      </PageTitle>
      
      <Card className="max-w-full md:max-w-lg mx-auto">
        <CardHeader className="px-4 pt-4 pb-3 sm:p-6 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl">Connect With Me</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            You can reach out to me via the following platforms. I'm always open to discussing new projects, cybersecurity topics, or collaboration opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-5 px-4 sm:p-6">
          {contactMethods.map((method) => (
            <Button
              key={method.name}
              asChild
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 sm:py-3.5 border-primary/40 hover:bg-primary/10 hover:border-primary"
            >
              <Link href={method.href} target={method.external ? "_blank" : "_self"} rel={method.external ? "noopener noreferrer" : ""}>
                <method.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-accent flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-medium text-foreground">{method.name}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{method.username}</span>
                </div>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
