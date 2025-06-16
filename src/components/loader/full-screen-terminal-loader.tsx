
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, TerminalSquare } from 'lucide-react';

export interface GeolocationData {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
}

interface FullScreenTerminalLoaderProps {
  onSequenceComplete: (geoData: GeolocationData | null) => void;
}

const TYPING_SPEED = 60; // ms per character
const LINE_DELAY = 200; // ms delay before typing next line
const COMMAND_DELAY = 700; // ms delay after typing command
const MAX_SEQUENCE_DURATION = 10000; // 10 seconds max

const PROMPT = "root@UmerFarooq:~# ";
const IP2LOCATION_API_KEY = "53F1806FA9B697F562AB2EAE6321B9A6"; // Your API Key

export function FullScreenTerminalLoader({ onSequenceComplete }: FullScreenTerminalLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [errorGeo, setErrorGeo] = useState<string | null>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const terminalContentRef = useRef<HTMLDivElement | null>(null);
  const scriptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const completeSequence = useCallback((finalGeoData: GeolocationData | null) => {
    if (isComplete) return;
    setIsComplete(true);
    setIsSkipped(true); // Ensure all typing stops
    if (scriptTimeoutRef.current) clearTimeout(scriptTimeoutRef.current);
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    onSequenceComplete(finalGeoData);
  }, [onSequenceComplete, isComplete]);

  useEffect(() => {
    const fetchGeolocation = async () => {
      setIsLoadingGeo(true);
      setErrorGeo(null);
      try {
        const response = await fetch(`https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&format=json`);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error?.error_message || `API returned an error.`);
        }
        setGeolocation({
          ip: data.ip || 'Resolving...',
          city: data.city_name || 'Unknown City',
          region: data.region_name || 'Unknown Region',
          country: data.country_name || 'Unknown Country',
        });
      } catch (err) {
        let specificErrorMsg = 'Failed to retrieve geolocation data.';
        if (err instanceof TypeError && err.message.toLowerCase().includes('failed to fetch')) {
          specificErrorMsg = 'Network error or CORS issue prevented geolocation lookup.';
        } else if (err instanceof Error) {
          specificErrorMsg = err.message;
        }
        setErrorGeo(specificErrorMsg);
        setGeolocation({ ip: 'Unavailable', city: null, region: null, country: null });
      } finally {
        setIsLoadingGeo(false);
      }
    };
    fetchGeolocation();
  }, []);

  useEffect(() => {
    if (isSkipped || isLoadingGeo) return;

    const baseScript = [
      { text: `${PROMPT}system_diagnostics --initiate`, isCommand: true },
      { text: "[*] Initializing connection sequence...", isCommand: false, delay: LINE_DELAY },
      { text: "[*] Attempting user geolocation via ip2location.io...", isCommand: false, delay: LINE_DELAY },
    ];

    const geoErrorLine = errorGeo ? [{ text: `[!] Geolocation Error: ${errorGeo}. Proceeding...`, isCommand: false, isError: true, delay: LINE_DELAY }] : [];
    
    const geoSuccessLines = geolocation ? [
      { text: `[+] IP Address Detected: ${geolocation.ip}`, isCommand: false, delay: LINE_DELAY },
      { text: `[+] Location Identified: ${geolocation.city || 'N/A'}, ${geolocation.region || 'N/A'}, ${geolocation.country || 'N/A'}`, isCommand: false, delay: LINE_DELAY },
    ] : [];

    const finalScript = [
      ...baseScript,
      ...geoErrorLine,
      ...geoSuccessLines,
      { text: `${PROMPT}access_control --grant --user ${geolocation?.ip || 'guest'}`, isCommand: true },
      { text: "[+] Secure channel established.", isCommand: false, delay: LINE_DELAY },
      { text: `[+] Access Granted. Welcome, ${geolocation?.ip || 'visitor'}.`, isCommand: false, isFinal: true, delay: LINE_DELAY, preGlitch: true },
      { text: PROMPT, isCommand: false, finalPrompt: true, delay: LINE_DELAY },
    ];
    
    let scriptIdx = 0;
    let charIdx = 0;
    let currentDisplayedLines: string[] = [];

    const typeLine = () => {
      if (isSkipped || scriptIdx >= finalScript.length) {
        if(!isSkipped) completeSequence(geolocation);
        return;
      }

      const currentScriptItem = finalScript[scriptIdx];
      if (charIdx < currentScriptItem.text.length) {
        setCurrentLineText(prev => prev + currentScriptItem.text[charIdx]);
        charIdx++;
        scriptTimeoutRef.current = setTimeout(typeLine, TYPING_SPEED);
      } else {
        currentDisplayedLines = [...currentDisplayedLines, currentScriptItem.text];
        setLines([...currentDisplayedLines]);
        setCurrentLineText("");
        charIdx = 0;
        scriptIdx++;
        
        let delayForNextLine = currentScriptItem.delay || LINE_DELAY;
        if (currentScriptItem.isCommand) delayForNextLine = COMMAND_DELAY;
        if (currentScriptItem.isFinal) delayForNextLine = 1500; // Longer pause before finishing

        if (scriptIdx < finalScript.length) {
          scriptTimeoutRef.current = setTimeout(typeLine, delayForNextLine);
        } else {
          completeSequence(geolocation);
        }
      }
    };

    const initialDelay = setTimeout(typeLine, 500); // Initial delay before starting
    
    // Overall timeout for the sequence
    sequenceTimerRef.current = setTimeout(() => {
        if (!isComplete) {
            console.log("Loader sequence timed out.");
            completeSequence(geolocation);
        }
    }, MAX_SEQUENCE_DURATION);


    return () => {
      if (scriptTimeoutRef.current) clearTimeout(scriptTimeoutRef.current);
      if (initialDelay) clearTimeout(initialDelay);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    };
  }, [isSkipped, isLoadingGeo, geolocation, errorGeo, completeSequence]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isComplete) completeSequence(geolocation);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [completeSequence, geolocation, isComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [lines, currentLineText]);


  const getLineClass = (lineText: string) => {
    if (lineText.startsWith('[!]')) return 'text-red-400';
    if (lineText.startsWith('[+]')) return 'text-green-400';
    if (lineText.startsWith(PROMPT) || lineText.startsWith('[*]')) return 'text-primary'; // Use primary for commands and neutral info
    return 'text-primary';
  };
  
  const isFinalWelcomeLine = (lineText: string) => {
     return lineText.includes("Access Granted. Welcome");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black font-code text-sm md:text-base"
    >
      <div className="w-full h-full max-w-screen-xl p-4 md:p-8 overflow-y-auto" ref={terminalContentRef}>
        {lines.map((line, index) => (
          <div key={index} className={`whitespace-pre-wrap break-words ${getLineClass(line)} ${isFinalWelcomeLine(line) ? 'animate-glitch' : ''}`}>
            {line}
          </div>
        ))}
        {currentLineText && (
          <div className={`whitespace-pre-wrap break-words inline ${getLineClass(currentLineText)} ${isFinalWelcomeLine(PROMPT + currentLineText) ? 'animate-glitch': '' }`}>
            {currentLineText}
            {showCursor && !isComplete && <span className="terminal-cursor"></span>}
          </div>
        )}
         {!currentLineText && lines.length > 0 && lines[lines.length - 1]?.startsWith(PROMPT) && showCursor && !isComplete && (
            <span className="terminal-cursor"></span>
        )}
      </div>

      {!isComplete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => completeSequence(geolocation)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary hover:bg-gray-800"
          aria-label="Skip intro sequence"
        >
          Skip Intro [ESC]
        </Button>
      )}

      {isLoadingGeo && lines.length < 2 && ( // Show loader only at the very beginning if geo is loading
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <TerminalSquare className="h-12 w-12 text-primary animate-pulse mb-4"/>
              <p className="text-primary text-lg">Booting UmerFarooq.Cyber Systems...</p>
              <Loader2 className="h-6 w-6 animate-spin text-accent mt-3"/>
          </div>
      )}
    </motion.div>
  );
}
