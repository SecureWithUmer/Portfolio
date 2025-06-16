
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// --- Tone.js Script Loader & Audio Management ---
const useTerminalAudio = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const synths = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.Tone || document.querySelector('script[src*="tone"]')) {
            if (window.Tone) setIsLoaded(true);
            const existingScript = document.querySelector('script[src*="tone"]') as HTMLScriptElement;
            if (existingScript && !window.Tone) {
                existingScript.onload = () => { if(window.Tone) setIsLoaded(true); };
                existingScript.onerror = () => console.error("Error in existing Tone.js script");
            }
            return;
        }

        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
        script.async = true;
        script.onload = () => {
            if (window.Tone) setIsLoaded(true);
        };
        script.onerror = () => console.error("Failed to load Tone.js");
        document.body.appendChild(script);
        
        return () => { 
            if (script.parentNode) script.parentNode.removeChild(script); 
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
        if (!synths.current || !window.Tone || typeof window.Tone.now !== 'function' ||  (window.Tone.context && window.Tone.context.state !== 'running')) return;
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
    
    useEffect(() => {
        if (typeof window === 'undefined' || !isLoaded) return; 
        const startAudioContext = async () => {
            if (window.Tone && window.Tone.context && window.Tone.context.state !== 'running') {
                try {
                    await window.Tone.start();
                } catch (error) {
                    console.warn("Failed to start Tone.js audio context:", error);
                }
            }
            if (typeof window !== 'undefined') {
              window.removeEventListener('click', startAudioContext);
              window.removeEventListener('keydown', startAudioContext);
              window.removeEventListener('touchstart', startAudioContext);
            }
        };

        if (typeof window !== 'undefined') {
          window.addEventListener('click', startAudioContext, { once: true });
          window.addEventListener('keydown', startAudioContext, { once: true });
          window.addEventListener('touchstart', startAudioContext, { once: true });
        }

        return () => {
            if (typeof window === 'undefined') return;
            window.removeEventListener('click', startAudioContext);
            window.removeEventListener('keydown', startAudioContext);
            window.removeEventListener('touchstart', startAudioContext);
        };
    }, [isLoaded]); 

    return { isAudioReady: isLoaded, playSound };
};

interface FullScreenTerminalLoaderProps {
  onSequenceComplete: () => void;
}

type LoaderPhase = 'initial-text' | 'login-form' | 'authenticating' | 'access-granted';

const initialTexts = ["Loading Systems...", "Processing Credentials...", "Authentication Required..."];
const DOT_COUNT = 8; // Reduced for better mobile fit

const Typewriter = ({ text, onComplete, playSound, speed = 80, showCursorAfter = true }: { text: string, onComplete: () => void, playSound: (sound: 'keypress') => void, speed?: number, showCursorAfter?: boolean }) => {
    const [typedText, setTypedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const textRef = useRef(text);

    useEffect(() => {
        textRef.current = text;
        setTypedText('');
        setCursorVisible(true);
    }, [text]);
    
    useEffect(() => {
        let charTimeout: NodeJS.Timeout;
        if (typedText.length < textRef.current.length) {
            charTimeout = setTimeout(() => {
                setTypedText(textRef.current.slice(0, typedText.length + 1));
                if (textRef.current[typedText.length] !== ' ' && textRef.current[typedText.length]) { 
                    playSound('keypress');
                }
            }, speed);
        } else {
            if (!showCursorAfter) setCursorVisible(false);
            const completionTimeout = setTimeout(onComplete, showCursorAfter ? 400 : 150);
            return () => clearTimeout(completionTimeout);
        }
        return () => clearTimeout(charTimeout);
    }, [typedText, onComplete, playSound, speed, showCursorAfter]);

    return (
        <span>
            {typedText}
            {cursorVisible && typedText.length === textRef.current.length && <span className="terminal-cursor"></span>}
        </span>
    );
};

export default function FullScreenTerminalLoader({ onSequenceComplete }: FullScreenTerminalLoaderProps) {
    const [phase, setPhase] = useState<LoaderPhase>('initial-text');
    const [currentInitialTextIndex, setCurrentInitialTextIndex] = useState(0);
    const [usernameDots, setUsernameDots] = useState('');
    const [passwordDots, setPasswordDots] = useState('');
    const [isSkipped, setIsSkipped] = useState(false);
    const { playSound } = useTerminalAudio();

    const skipIntro = useCallback(() => {
        setIsSkipped(true);
        onSequenceComplete();
    }, [onSequenceComplete]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                skipIntro();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [skipIntro]);

    const handleInitialTextComplete = useCallback(() => {
        if (currentInitialTextIndex < initialTexts.length - 1) {
            setTimeout(() => setCurrentInitialTextIndex(prev => prev + 1), 600); 
        } else {
             setTimeout(() => setPhase('login-form'), 1000); 
        }
    }, [currentInitialTextIndex]);

    useEffect(() => {
        if (phase === 'login-form') {
            let dotTimeouts: NodeJS.Timeout[] = [];
            const typeDots = (setter: React.Dispatch<React.SetStateAction<string>>, delayOffset = 0) => {
                for (let i = 0; i < DOT_COUNT; i++) {
                    dotTimeouts.push(setTimeout(() => {
                        setter(prev => prev + '●');
                        playSound('keypress');
                    }, delayOffset + i * 90)); 
                }
            };

            typeDots(setUsernameDots);
            typeDots(setPasswordDots, DOT_COUNT * 90 + 300); 

            dotTimeouts.push(setTimeout(() => {
                setPhase('authenticating');
            }, (DOT_COUNT * 90 * 2) + 700));

            return () => dotTimeouts.forEach(clearTimeout);
        }
    }, [phase, playSound]);
    
    useEffect(() => {
        if (phase === 'authenticating') {
            const timer = setTimeout(() => {
                setPhase('access-granted');
                playSound('confirm'); 
            }, 2200); 
            return () => clearTimeout(timer);
        }
    }, [phase, playSound]);

    useEffect(() => {
        if (phase === 'access-granted' && !isSkipped) {
            const timer = setTimeout(() => {
                onSequenceComplete();
            }, 2800); 
            return () => clearTimeout(timer);
        }
    }, [phase, onSequenceComplete, isSkipped, playSound]);


    if (isSkipped) return null;

    return (
        <motion.div
            key="loader-main"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background font-code text-primary p-4 overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {phase === 'initial-text' && (
                    <motion.div
                        key="initial-text-phase"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: {duration: 0.3} }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary">
                            <Typewriter
                                key={`initial-text-${currentInitialTextIndex}`}
                                text={initialTexts[currentInitialTextIndex]}
                                onComplete={handleInitialTextComplete}
                                playSound={playSound}
                                speed={100}
                            />
                        </h2>
                    </motion.div>
                )}

                {phase === 'login-form' && (
                    <motion.div
                        key="login-form-phase"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -30, transition: {duration: 0.3} }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "circOut" }}
                        className="w-full max-w-[280px] xs:max-w-xs sm:max-w-sm p-4 xs:p-6 sm:p-8 bg-card/50 border border-primary/40 rounded-xl shadow-2xl shadow-primary/20"
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-headline text-center text-primary mb-5 sm:mb-6 tracking-wider">SYSTEM LOGIN</h3>
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <Label htmlFor="fake-username" className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Identity Key:</Label>
                                <div className="mt-1 p-2 sm:p-2.5 h-9 sm:h-10 bg-input rounded-md border border-border text-primary/90 font-mono text-sm sm:text-base tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] overflow-hidden whitespace-nowrap flex items-center">
                                    {usernameDots}
                                    {usernameDots.length < DOT_COUNT && <span className="terminal-cursor !h-4 sm:!h-5 !translate-y-0"></span>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="fake-password" className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">Auth Code:</Label>
                                <div className="mt-1 p-2 sm:p-2.5 h-9 sm:h-10 bg-input rounded-md border border-border text-primary/90 font-mono text-sm sm:text-base tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] overflow-hidden whitespace-nowrap flex items-center">
                                    {passwordDots}
                                    {passwordDots.length < DOT_COUNT && usernameDots.length === DOT_COUNT && <span className="terminal-cursor !h-4 sm:!h-5 !translate-y-0"></span>}
                                </div>
                            </div>
                            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4 sm:mt-5 py-2.5 sm:py-3 text-sm sm:text-base tracking-wider opacity-60 cursor-not-allowed" disabled>
                                ESTABLISHING CONNECTION...
                            </Button>
                        </div>
                    </motion.div>
                )}

                {phase === 'authenticating' && (
                    <motion.div
                        key="authenticating-phase"
                        initial={{ opacity: 0, y:10 }}
                        animate={{ opacity: 1, y:0, transition: { delay: 0.2 } }}
                        exit={{ opacity: 0, y:-10, transition: {duration: 0.3} }}
                        className="text-center flex flex-col items-center"
                    >
                        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-accent animate-spin mb-3 sm:mb-4" />
                        <p className="text-base sm:text-lg md:text-xl text-accent tracking-wide">Authenticating Matrix Link...</p>
                        <p className="text-xs sm:text-sm text-muted-foreground animate-pulse mt-1">Secure handshake in progress</p>
                    </motion.div>
                )}
                
                {phase === 'access-granted' && (
                     <motion.div
                        key="access-granted-phase"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 12, delay: 0.1 } }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                        className="text-center"
                    >
                        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-headline text-primary animate-neon-glow-primary mb-2 sm:mb-3 tracking-wider">ACCESS GRANTED</h1>
                        <p className="text-sm sm:text-base md:text-lg text-accent animate-pulse tracking-widest">Mainframe Connection Established.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isSkipped && phase !== 'access-granted' && (phase === 'initial-text' || phase === 'login-form') && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipIntro}
                    className="absolute bottom-4 right-4 xs:bottom-6 xs:right-6 sm:bottom-8 sm:right-8 text-muted-foreground/70 hover:text-foreground hover:bg-card/30 text-xs py-1 px-2"
                    aria-label="Skip Intro"
                >
                    [ESC] Skip Intro
                </Button>
            )}
        </motion.div>
    );
}

