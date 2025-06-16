
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

  // Removed useEffect that loaded profile from localStorage

  const handleProfileSaveAndFetch = () => {
    if (!userProfile.trim()) {
      toast({
        title: "Profile Missing",
        description: "Please enter a profile description first.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, userProfile); // Still save for current session use if desired
    toast({
      title: "Profile Saved",
      description: "Your cybersecurity profile has been updated for this session.",
    });
    fetchTip(userProfile);
  };

  const fetchTip = async (profile: string) => {
    if (!profile.trim()) {
      setTipOutput(null);
      setError("Please enter a profile to generate a tip.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setTipOutput(null); // Clear previous tip
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
    <Card className="w-full max-w-md sm:max-w-2xl mx-auto">
      <CardHeader className="px-4 pt-4 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-accent text-lg sm:text-xl">
          <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
          AI Cybersecurity Tip
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Personalize your tips by describing your cybersecurity knowledge (e.g., "beginner", "IT professional", "home user"). Profile is cleared on page refresh.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:p-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="userProfile">Your Profile:</Label>
          <Input
            id="userProfile"
            type="text"
            value={userProfile}
            onChange={(e) => setUserProfile(e.target.value)}
            placeholder="e.g., small business owner, student"
            className="sm:text-sm"
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center p-3 sm:p-4">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
            <p className="ml-2 text-sm sm:text-base">Generating your personalized tip...</p>
          </div>
        )}
        {error && !isLoading && <p className="text-destructive text-xs sm:text-sm">{error}</p>}
        {tipOutput && !isLoading && (
          <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-border">
            <h3 className="font-semibold text-base sm:text-lg text-primary">{tipOutput.tip}</h3>
            {tipOutput.codeSnippet && (
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Example Snippet:</p>
                <CodeBlock code={tipOutput.codeSnippet} />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 px-4 pb-4 pt-2 sm:p-6 sm:pt-3">
        <Button variant="outline" onClick={() => fetchTip(userProfile)} disabled={isLoading || !userProfile.trim()} size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
          {isLoading && userProfile.trim() ? <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : null}
          New Tip
        </Button>
        <Button onClick={handleProfileSaveAndFetch} disabled={isLoading || !userProfile.trim()} size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
          Save Profile & Get Tip
        </Button>
      </CardFooter>
    </Card>
  );
}
