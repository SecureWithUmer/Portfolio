
"use client";

import { useEffect, useState } from 'react';
import { Hash } from 'lucide-react'; // Using Hash for a crypto feel
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


function generatePseudoHash(length = 24) { // Increased length for more "hash-like" appearance
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    if (i > 0 && (i + 1) % 4 === 0 && i < length -1) result += '-'; // Add dashes for readability
  }
  return result.toUpperCase();
}

export function CryptoVisitorCounter() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a new "session ID" on each mount (simulating a unique visitor)
    // This ensures it only runs on the client, avoiding hydration mismatches.
    setSessionId(generatePseudoHash());
  }, []); // Empty dependency array means this runs once on mount client-side

  if (!sessionId) {
    // Render a placeholder or null during server render / before mount
    return (
        <Card className="w-full max-w-md mx-auto shadow-md">
            <CardHeader>
                 <CardTitle className="flex items-center justify-center text-lg text-primary">
                    <Hash className="h-5 w-5 mr-2 text-accent" />
                    Secure Session Identifier
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <div className="font-code text-sm text-muted-foreground bg-secondary p-3 rounded animate-pulse h-8 w-3/4 mx-auto"></div>
                <CardDescription className="text-xs text-muted-foreground/70 mt-3">
                    Initializing secure session...
                </CardDescription>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/40">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-lg text-primary">
          <Hash className="h-5 w-5 mr-2 text-accent" />
          Secure Session Identifier
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="font-code text-md text-muted-foreground bg-secondary p-3 rounded-md border border-border/50 shadow-inner break-all">
          {sessionId}
        </p>
        <CardDescription className="text-xs text-muted-foreground/80 mt-3 italic px-2">
          This is a simulated unique session identifier for enhanced site feel &amp; demonstration purposes.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
