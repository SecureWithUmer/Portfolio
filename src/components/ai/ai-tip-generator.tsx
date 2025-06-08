"use client";

import { useState, useEffect } from 'react';
import { generateCybersecurityTip, type CybersecurityTipOutput } from '@/ai/flows/cybersecurity-tip-generator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_KEY = 'cybersecurityUserProfile';

export function AiTipGenerator() {
  const [userProfile, setUserProfile] = useState('');
  const [tipOutput, setTipOutput] = useState<CybersecurityTipOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProfile) {
      setUserProfile(storedProfile);
      fetchTip(storedProfile);
    }
  }, []);

  const handleProfileSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, userProfile);
    toast({
      title: "Profile Saved",
      description: "Your cybersecurity profile has been updated.",
    });
    fetchTip(userProfile);
  };

  const fetchTip = async (profile: string) => {
    if (!profile.trim()) {
      // Clear previous tip if profile is empty
      setTipOutput(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const output = await generateCybersecurityTip({ userProfile: profile });
      setTipOutput(output);
    } catch (err) {
      console.error("Error generating tip:", err);
      setError('Failed to generate tip. Please try again.');
      toast({
        title: "Error",
        description: "Failed to generate cybersecurity tip.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Lightbulb className="h-6 w-6" />
          AI Cybersecurity Tip of the Week
        </CardTitle>
        <CardDescription>
          Personalize your tips by describing your cybersecurity knowledge (e.g., "beginner", "IT professional", "home user").
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userProfile">Your Profile:</Label>
          <Input
            id="userProfile"
            type="text"
            value={userProfile}
            onChange={(e) => setUserProfile(e.target.value)}
            placeholder="e.g., small business owner, student"
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Generating your personalized tip...</p>
          </div>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
        {tipOutput && !isLoading && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-semibold text-lg text-primary">{tipOutput.tip}</h3>
            {tipOutput.codeSnippet && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Example Snippet:</p>
                <CodeBlock code={tipOutput.codeSnippet} />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => fetchTip(userProfile)} disabled={isLoading || !userProfile.trim()}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          New Tip
        </Button>
        <Button onClick={handleProfileSave} disabled={isLoading}>
          Save Profile & Get Tip
        </Button>
      </CardFooter>
    </Card>
  );
}
