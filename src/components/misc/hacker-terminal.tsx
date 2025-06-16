
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface GeolocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
}

const TYPING_SPEED = 50; // ms per character
const LINE_DELAY = 300; // ms delay before typing next line
const COMMAND_DELAY = 1000; // ms delay after typing command

const PROMPT = "root@kali:~# ";

export function HackerTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [errorGeo, setErrorGeo] = useState<string | null>(null);
  const [showCursor, setShowCursor] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchGeolocation = async () => {
      setIsLoadingGeo(true);
      setErrorGeo(null);
      try {
        const response = await fetch('http://ip-api.com/json/?fields=query,city,regionName,country');
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 'fail') {
          throw new Error('Geolocation lookup failed.');
        }
        setGeolocation({
          ip: data.query,
          city: data.city || 'Unknown City',
          region: data.regionName || 'Unknown Region',
          country: data.country || 'Unknown Country',
        });
      } catch (err) {
        console.error("Geolocation fetch error:", err);
        setErrorGeo(err instanceof Error ? err.message : 'Failed to fetch geolocation.');
        // Fallback data
        setGeolocation({
          ip: 'Unavailable',
          city: 'Location Hidden',
          region: 'Stealth Mode',
          country: 'Digital Realm',
        });
      } finally {
        setIsLoadingGeo(false);
      }
    };

    fetchGeolocation();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, currentLineText]);

  useEffect(() => {
    if (isLoadingGeo) return; // Wait for geolocation data

    const script = [
      { text: `${PROMPT}system_diagnostics --user_session --geolocate`, isCommand: true },
      { text: "[*] Initializing diagnostic sequence for current session...", isCommand: false, delay: LINE_DELAY },
      { text: "[+] Attempting user geolocation...", isCommand: false, delay: LINE_DELAY },
      { text: `[+] IP Address Detected: ${geolocation?.ip || 'Resolving...'}`, isCommand: false, delay: LINE_DELAY },
      { text: `[+] Location Identified: ${geolocation?.city}, ${geolocation?.region}, ${geolocation?.country}`, isCommand: false, delay: LINE_DELAY },
      { text: "[*] Establishing secure connection to Umer Farooq's Cyber Hub...", isCommand: false, delay: LINE_DELAY },
      { text: `[+] Welcome, operative from ${geolocation?.city || 'the Ether'}. Access granted.`, isCommand: false, delay: LINE_DELAY },
      { text: "[*] All systems nominal. Standby for operations.", isCommand: false, delay: LINE_DELAY },
      { text: PROMPT, isCommand: false, finalPrompt: true, delay: LINE_DELAY },
    ];

    let scriptIndex = 0;
    let charIndex = 0;
    let currentTimeoutId: NodeJS.Timeout;

    const typeLine = () => {
      if (scriptIndex >= script.length) {
        setCurrentLineText(""); // Clear current line text after script finishes if needed or keep prompt
        return;
      }

      const currentScriptLine = script[scriptIndex];
      if (charIndex < currentScriptLine.text.length) {
        setCurrentLineText(prev => prev + currentScriptLine.text[charIndex]);
        charIndex++;
        currentTimeoutId = setTimeout(typeLine, TYPING_SPEED);
      } else {
        // Line finished typing
        setLines(prev => [...prev, currentScriptLine.text]);
        setCurrentLineText("");
        charIndex = 0;
        scriptIndex++;
        
        if (scriptIndex < script.length) {
            const nextScriptLine = script[scriptIndex];
            let delay = nextScriptLine.delay || LINE_DELAY;
            if(currentScriptLine.isCommand) delay = COMMAND_DELAY;

            currentTimeoutId = setTimeout(typeLine, delay);
        } else {
            // Script finished, set final prompt without typing animation
            setLines(prev => [...prev, PROMPT]);
            setCurrentLineText(""); // Ensure current typing buffer is clear
        }
      }
    };

    // Start the script after a brief initial delay
    const initialDelay = setTimeout(typeLine, 500);

    return () => {
      clearTimeout(currentTimeoutId);
      clearTimeout(initialDelay);
    };
  }, [geolocation, isLoadingGeo]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/60 bg-black overflow-hidden animate-glitch">
      <CardContent className="p-4 md:p-6 font-code text-sm text-primary min-h-[280px] max-h-[400px] overflow-y-auto relative flex flex-col">
        <div className="flex-grow">
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
          {currentLineText && (
            <div className="whitespace-pre-wrap break-words">
              {currentLineText}
              {showCursor && <span className="terminal-cursor"></span>}
            </div>
          )}
          {!currentLineText && lines.length > 0 && lines[lines.length -1].startsWith(PROMPT) && showCursor && (
             <div className="whitespace-pre-wrap break-words inline">
                <span className="terminal-cursor"></span>
            </div>
          )}
        </div>
        {isLoadingGeo && lines.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="ml-3 text-accent">Initializing Secure Terminal...</p>
          </div>
        )}
        <div ref={terminalEndRef} />
      </CardContent>
    </Card>
  );
}
