
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Tone.js Script Loader & Audio Management ---
const useTerminalAudio = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const synths = useRef<any>(null);

    useEffect(() => {
        // Check if Tone.js is already loaded or if the script tag already exists
        if (window.Tone || document.querySelector('script[src*="tone"]')) {
            if (window.Tone) setIsLoaded(true);
            // If script tag exists but window.Tone is not yet available, wait for onload
            const existingScript = document.querySelector('script[src*="tone"]') as HTMLScriptElement;
            if (existingScript && !window.Tone) {
                existingScript.onload = () => setIsLoaded(true);
                existingScript.onerror = () => console.error("Error in existing Tone.js script");
            }
            return;
        }

        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
        script.async = true;
        script.onload = () => setIsLoaded(true);
        script.onerror = () => console.error("Failed to load Tone.js");
        document.body.appendChild(script);
        
        return () => { 
            if (script.parentNode) script.parentNode.removeChild(script); 
            // Potentially reset synths.current or clean up Tone.js instances if necessary
        };
    }, []);

    useEffect(() => {
        if (isLoaded && window.Tone && !synths.current) {
            synths.current = {
                keypress: new window.Tone.MembraneSynth({
                    pitchDecay: 0.01,
                    octaves: 2,
                    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
                }).toDestination(),
                confirm: new window.Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.5 } }).toDestination(),
            };
        }
    }, [isLoaded]);

    const playSound = useCallback((sound: 'keypress' | 'confirm') => {
        if (!synths.current || !window.Tone || window.Tone.context.state !== 'running') return;
        const now = window.Tone.now();
        try {
            switch (sound) {
                case 'keypress':
                    synths.current.keypress.triggerAttackRelease('C1', '8n', now);
                    break;
                case 'confirm':
                     synths.current.confirm.triggerAttackRelease('G5', '8n', now);
                    break;
            }
        } catch (error) {
            console.warn("Tone.js playback error:", error);
        }
    }, []);
    
    // Attempt to start audio context on first interaction
    useEffect(() => {
        if (!isAudioReady) return;
        const startAudioContext = async () => {
            if (window.Tone && window.Tone.context.state !== 'running') {
                try {
                    await window.Tone.start();
                } catch (error) {
                    console.warn("Failed to start Tone.js audio context:", error);
                }
            }
            // Clean up listeners once context is running or attempt has been made
            window.removeEventListener('click', startAudioContext);
            window.removeEventListener('keydown', startAudioContext);
            window.removeEventListener('touchstart', startAudioContext);
        };

        // Add multiple event listeners for robust activation
        window.addEventListener('click', startAudioContext, { once: true });
        window.addEventListener('keydown', startAudioContext, { once: true });
        window.addEventListener('touchstart', startAudioContext, { once: true });

        return () => {
            window.removeEventListener('click', startAudioContext);
            window.removeEventListener('keydown', startAudioContext);
            window.removeEventListener('touchstart', startAudioContext);
        };
    }, [isAudioReady]);


    return { isAudioReady, playSound };
};


// --- Data Interfaces ---
export interface GeolocationData {
  ip: string;
  city: string | null;
  region: string | null; // Added for ip2location
  country: string | null;
}

interface FullScreenTerminalLoaderProps {
  onSequenceComplete: (geoData: GeolocationData | null) => void;
}

// --- Main Application ---
export default function FullScreenTerminalLoader({ onSequenceComplete }: FullScreenTerminalLoaderProps) {
    const [appState, setAppState] = useState<'booting' | 'welcome' | 'done'>('booting');
    const [geoDataForToast, setGeoDataForToast] = useState<GeolocationData | null>(null);
    const { isAudioReady, playSound } = useTerminalAudio();

    const handleBootComplete = useCallback((fetchedGeoData: GeolocationData | null) => {
        setGeoDataForToast(fetchedGeoData);
        if (isAudioReady) playSound('confirm');
        setAppState('welcome');
    }, [playSound, isAudioReady]);

    const handleWelcomeComplete = useCallback(() => {
        setAppState('done');
        onSequenceComplete(geoDataForToast);
    }, [onSequenceComplete, geoDataForToast]);

    return (
        <>
            <style>{`
                /* Ensure font-code (Source Code Pro) is used if @import is not ideal here */
                .font-terminal { font-family: var(--font-source-code-pro), 'Source Code Pro', monospace; }
                .terminal-bg { background-color: hsl(var(--background)); }
                .terminal-text-primary { color: hsl(var(--primary)); }
                .terminal-text-accent { color: hsl(var(--accent)); }
                .terminal-text-muted { color: hsl(var(--muted-foreground)); }
                .terminal-text-destructive { color: hsl(var(--destructive)); }
                .text-glow-primary { text-shadow: 0 0 8px hsl(var(--primary) / 0.5); }
                .terminal-cursor {
                    display: inline-block;
                    width: 0.6em;
                    height: 1.2em;
                    background-color: hsl(var(--primary));
                    animation: blink 1s step-end infinite;
                    box-shadow: 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary));
                    margin-left: 2px;
                    transform: translateY(0.2em); /* Adjust vertical alignment */
                }

                @keyframes blink {
                    from, to { background-color: transparent; box-shadow: none; }
                    50% { background-color: hsl(var(--primary)); box-shadow: 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)); }
                }
            `}</style>
            
            <AnimatePresence>
                {appState === 'booting' && (
                    <TerminalSequence onComplete={handleBootComplete} playSound={playSound} />
                )}
                {appState === 'welcome' && (
                    <WelcomeScreen name={geoDataForToast?.ip || 'Visitor'} onComplete={handleWelcomeComplete} />
                )}
            </AnimatePresence>
            {/* The main portfolio content will be rendered by RootLayout once appState is 'done' */}
        </>
    );
}

// --- Typing Effect Component ---
const Typewriter = ({ text, onComplete, playSound, speed = 50 }: { text: string, onComplete: () => void, playSound: (sound: 'keypress') => void, speed?: number }) => {
    const [typedText, setTypedText] = useState('');
    
    useEffect(() => {
        if (typedText.length < text.length) {
            const timeoutId = setTimeout(() => {
                setTypedText(text.slice(0, typedText.length + 1));
                if (text[typedText.length] !== ' ' && text[typedText.length]) { // Ensure not to play on last undefined char
                    playSound('keypress');
                }
            }, speed);
            return () => clearTimeout(timeoutId);
        } else {
            const timeoutId = setTimeout(onComplete, 100); // Shortened pause
            return () => clearTimeout(timeoutId);
        }
    }, [typedText, text, onComplete, playSound, speed]);

    return <span>{typedText}</span>;
};

// --- Terminal Sequence Component ---
const TerminalSequence = ({ onComplete, playSound }: { onComplete: (geoData: GeolocationData | null) => void, playSound: (sound: 'keypress') => void }) => {
    const [lines, setLines] = useState<React.ReactNode[]>([]);
    const [step, setStep] = useState(0);
    const [showCursor, setShowCursor] = useState(false);
    const IP2LOCATION_API_KEY = "53F1806FA9B697F562AB2EAE6321B9A6"; // API Key

    const addLine = useCallback((newLine: React.ReactNode, lineDelay = 0) => {
        setTimeout(() => {
            setLines(prev => [...prev, newLine]);
        }, lineDelay);
    }, []);

    const runCommand = useCallback((commandText: string, nextStepDelay = 500) => {
        setShowCursor(true);
        const Command = (
            <div className="flex">
                <span className="terminal-text-accent">umer@cybersec</span>
                <span className="terminal-text-muted">:</span>
                <span className="terminal-text-primary">~</span>
                <span className="terminal-text-muted">$ &nbsp;</span>
                <Typewriter text={commandText} onComplete={() => {
                    setShowCursor(false);
                    setTimeout(() => setStep(s => s + 1), nextStepDelay);
                }} playSound={playSound} speed={60} />
            </div>
        );
        addLine(Command);
    }, [addLine, playSound]);

    useEffect(() => {
        const sequence = async () => {
            // This structure ensures each step runs once
            if (step === 0) {
                addLine('System Booting...', 100);
                setStep(s => s + 1);
            } else if (step === 1 && lines.length === 1) { // Ensure previous line added
                addLine('Establishing Secure Connection...', 800);
                setStep(s => s + 1);
            } else if (step === 2 && lines.length === 2) {
                 setTimeout(() => runCommand('trace_user --verbose', 100), 800); // nextStepDelay is handled by Typewriter's onComplete
            } else if (step === 3 && lines.length === 3) {
                addLine((<span className="terminal-text-muted">Initiating geolocation lookup...</span>), 200);
                try {
                    // Fetch IP first from a reliable source if needed, or let ip2location use client's IP
                    const geoRes = await fetch(`https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&format=json`);
                    if (!geoRes.ok) throw new Error(`ip2location.io API error: ${geoRes.status}`);
                    const geoData = await geoRes.json();

                    if (geoData.error_message) throw new Error(geoData.error_message);
                    
                    const fetchedGeo: GeolocationData = {
                        ip: geoData.ip || 'Unknown IP',
                        city: geoData.city_name || 'Unknown City',
                        region: geoData.region_name || 'Unknown Region',
                        country: geoData.country_name || 'Unknown Country',
                    };

                    addLine((<span className="terminal-text-primary">IP Detected: {fetchedGeo.ip}</span>), 100);
                    addLine((<span className="terminal-text-primary">Location: {fetchedGeo.city}, {fetchedGeo.region}, {fetchedGeo.country}</span>), 200);
                    addLine((<span className="terminal-text-primary">ISP (Example): {geoData.isp || 'Not Available'}</span>), 300); // ISP if available

                    setTimeout(() => onComplete(fetchedGeo), 1200);

                } catch (error: any) {
                    console.error("Failed to get location info:", error);
                    let errorMsg = 'Could not resolve user identity.';
                    if (error && error.message && error.message.toLowerCase().includes('failed to fetch')) {
                        errorMsg = '[NETWORK/CORS ERROR] Geolocation lookup failed. Check connection or ad-blockers.';
                    } else if (error && error.message) {
                        errorMsg = `[API ERROR] ${error.message}`;
                    }

                    addLine((<span className="terminal-text-destructive">> Error: {errorMsg}</span>), 100);
                    addLine((<span className="terminal-text-muted">> Granting anonymous access...</span>), 200);
                    setTimeout(() => onComplete({ip: 'Anonymous', city: null, region: null, country: null}), 1200);
                }
                setStep(s => s + 1); // Mark step as processed to prevent re-running fetch
            }
        };
        sequence();
    }, [step, addLine, runCommand, onComplete, lines.length]); // Depend on lines.length to chain addLine calls correctly

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center terminal-bg font-terminal text-sm md:text-base"
        >
            <div className="w-full max-w-3xl p-4 md:p-6">
                <div className="bg-black/40 p-4 md:p-6 rounded-lg border border-primary/30 h-80 md:h-96 overflow-y-auto space-y-1.5 shadow-2xl">
                    {lines.map((line, i) => (
                        <div key={i} className="terminal-text-primary text-glow-primary">
                           {line}
                        </div>
                    ))}
                    {showCursor && <div className="terminal-cursor"></div>}
                </div>
            </div>
        </motion.div>
    );
};


// --- Welcome Screen Component ---
const WelcomeScreen = ({ name, onComplete }: { name: string, onComplete: () => void }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2800); // Increased duration for welcome
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-[210] flex flex-col items-center justify-center terminal-bg font-terminal"
        >
            <div className="text-center">
                 <motion.h1 
                    initial={{y: 60, opacity: 0}} 
                    animate={{y: 0, opacity: 1}} 
                    transition={{delay: 0.2, duration: 0.9, ease: 'easeOut'}} 
                    className="text-5xl md:text-7xl font-bold terminal-text-primary text-glow-primary uppercase tracking-wider"
                 >
                    Access Granted
                </motion.h1>
                <motion.p 
                    initial={{y: 30, opacity: 0}} 
                    animate={{y: 0, opacity: 1}} 
                    transition={{delay: 0.6, duration: 0.9, ease: 'easeOut'}} 
                    className="mt-5 terminal-text-accent text-glow-primary text-md md:text-lg tracking-widest"
                >
                   Welcome, {name}
                </motion.p>
            </div>
        </motion.div>
    );
};


    