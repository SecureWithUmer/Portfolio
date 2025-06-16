
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
const IP2LOCATION_API_KEY = "53F1806FA9B697F562AB2EAE6321B9A6";

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
        // Fetch IP and geolocation from ip2location.io
        // The API returns the current user's IP info if no IP is specified in the query
        const response = await fetch(`https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&format=json`);
        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error?.error_message || `API Error: ${response.statusText || response.status}`);
        }
        
        setGeolocation({
          ip: data.ip || 'Resolving...',
          city: data.city_name || 'Unknown City',
          region: data.region_name || 'Unknown Region',
          country: data.country_name || 'Unknown Country',
        });
      } catch (err) {
        console.error("Geolocation fetch error:", err);
        setErrorGeo(err instanceof Error ? err.message : 'Failed to fetch geolocation data.');
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

    const scriptPreamble = [
      { text: `${PROMPT}system_diagnostics --user_session --geolocate`, isCommand: true, isError: false },
      { text: "[*] Initializing diagnostic sequence for current session...", isCommand: false, isError: false, delay: LINE_DELAY },
    ];

    if (errorGeo) {
      scriptPreamble.push({ text: `[!] Geolocation Error: ${errorGeo}. Using fallback.`, isCommand: false, isError: true, delay: LINE_DELAY });
    } else {
      scriptPreamble.push({ text: "[+] Attempting user geolocation via ip2location.io...", isCommand: false, isError: false, delay: LINE_DELAY });
    }

    const scriptCore = [
      { text: `[+] IP Address Detected: ${geolocation?.ip || 'Resolving...'}`, isCommand: false, isError: false, delay: LINE_DELAY },
      { text: `[+] Location Identified: ${geolocation?.city}, ${geolocation?.region}, ${geolocation?.country}`, isCommand: false, isError: false, delay: LINE_DELAY },
      { text: "[*] Establishing secure connection to Umer Farooq's Cyber Hub...", isCommand: false, isError: false, delay: LINE_DELAY },
      { text: `[+] Welcome, operative from ${geolocation?.city || 'the Ether'}. Access granted.`, isCommand: false, isError: false, delay: LINE_DELAY },
      { text: "[*] All systems nominal. Standby for operations.", isCommand: false, isError: false, delay: LINE_DELAY },
      { text: PROMPT, isCommand: false, finalPrompt: true, isError: false, delay: LINE_DELAY },
    ];

    const script = [...scriptPreamble, ...scriptCore];
    
    // Reset lines if the script is re-generating due to errorGeo or geolocation update after initial load
    setLines([]);
    setCurrentLineText("");

    let scriptIndex = 0;
    let charIndex = 0;
    let currentTimeoutId: NodeJS.Timeout;

    const typeLine = () => {
      if (scriptIndex >= script.length) {
        setCurrentLineText(""); 
        return;
      }

      const currentScriptLine = script[scriptIndex];
      if (charIndex < currentScriptLine.text.length) {
        setCurrentLineText(prev => prev + currentScriptLine.text[charIndex]);
        charIndex++;
        currentTimeoutId = setTimeout(typeLine, TYPING_SPEED);
      } else {
        // Line finished typing
        setLines(prev => [...prev, currentScriptLine.text]); // Could also store isError here if needed for styling lines
        setCurrentLineText("");
        charIndex = 0;
        scriptIndex++;
        
        if (scriptIndex < script.length) {
            const nextScriptLine = script[scriptIndex];
            let delay = nextScriptLine.delay || LINE_DELAY;
            if(currentScriptLine.isCommand) delay = COMMAND_DELAY;

            currentTimeoutId = setTimeout(typeLine, delay);
        } else {
             // Script finished, ensure the last line (prompt) is added if not already
            if (lines[lines.length -1] !== PROMPT && currentScriptLine.finalPrompt) {
                setLines(prev => [...prev, PROMPT]);
            }
            setCurrentLineText(""); 
        }
      }
    };

    // Start the script after a brief initial delay
    const initialDelay = setTimeout(typeLine, 500);

    return () => {
      clearTimeout(currentTimeoutId);
      clearTimeout(initialDelay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [geolocation, isLoadingGeo, errorGeo]); // Corrected dependencies


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/60 bg-black overflow-hidden animate-glitch">
      <CardContent className="p-4 md:p-6 font-code text-sm text-primary min-h-[280px] max-h-[400px] overflow-y-auto relative flex flex-col">
        <div className="flex-grow">
          {lines.map((line, index) => (
            // For simplicity, error lines are not specially styled here, but you could adapt it.
            // Example: check if line content matches errorGeo to style it.
            <div key={index} className={`whitespace-pre-wrap break-words ${line.startsWith('[!] Geolocation Error:') ? 'text-destructive' : 'text-primary'}`}>
              {line}
            </div>
          ))}
          {currentLineText && (
            <div className={`whitespace-pre-wrap break-words ${currentLineText.startsWith('[!] Geolocation Error:') ? 'text-destructive' : 'text-primary'}`}>
              {currentLineText}
              {showCursor && <span className="terminal-cursor"></span>}
            </div>
          )}
          {/* Ensure cursor blinks at the prompt after script finishes */}
          {!currentLineText && lines.length > 0 && lines[lines.length -1] === PROMPT && showCursor && (
             <div className={`whitespace-pre-wrap break-words inline ${lines[lines.length-1].startsWith('[!] Geolocation Error:') ? 'text-destructive' : 'text-primary'}`}>
                <span className="terminal-cursor"></span>
            </div>
          )}
        </div>
        {isLoadingGeo && lines.length === 0 && currentLineText === "" && ( // Only show loader if no lines and no current text
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
