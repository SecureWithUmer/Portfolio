
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { certifications } from '@/data/certifications';

const PROMPT_PREFIX = "umer@portfolio:~$";
const TYPING_SPEED = 20;

const aboutMeText = `As a passionate cybersecurity enthusiast hailing from Faisalabad, Pakistan, I am deeply committed to the art and science of digital defense. My journey in cybersecurity is driven by a relentless curiosity to understand and mitigate evolving threats. I possess a diverse skill set encompassing threat intelligence, network security, ethical hacking, and security audits.`;

const contactInfo = `
You can reach me through the following channels:
- LinkedIn: https://www.linkedin.com/in/hackandsecurewithumer
- GitHub:   https://github.com/SecureWithUmer
- Email:    hackwithumer@outlook.com
`;

const helpText = `
Available commands:
  about          - Displays a brief bio.
  certifications - Lists all my professional certifications.
  contact        - Shows my contact information.
  clear          - Clears the terminal screen.
  help           - Shows this help message.
`;

const useTypewriter = (text: string, onComplete: () => void) => {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        setTypedText('');
        let i = 0;
        const intervalId = setInterval(() => {
            setTypedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                onComplete();
            }
        }, TYPING_SPEED);

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return typedText;
};

interface CommandHistory {
    command: string;
    output: string | React.ReactNode;
}

const TypewriterOutput: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
    const typedText = useTypewriter(text, onComplete);
    return <div className="whitespace-pre-wrap">{typedText}</div>;
};

export function HackerTerminal() {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [currentOutput, setCurrentOutput] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, currentOutput, scrollToBottom]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (cmd: string) => {
        let output: string | React.ReactNode;
        const command = cmd.toLowerCase().trim();

        switch (command) {
            case 'help':
                output = helpText;
                break;
            case 'about':
                output = aboutMeText;
                break;
            case 'certifications':
                output = 'Fetching certifications...\n\n' + certifications.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
                break;
            case 'contact':
                output = contactInfo;
                break;
            case 'clear':
                setHistory([]);
                setIsExecuting(false);
                return;
            default:
                output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
                break;
        }

        const newHistoryItem = { command: `${PROMPT_PREFIX} ${cmd}`, output };
        setHistory(prev => [...prev, newHistoryItem]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isExecuting) {
            e.preventDefault();
            if (inputValue.trim() === 'clear') {
                setHistory([]);
                setInputValue('');
                return;
            }
            setIsExecuting(true);
            setCurrentOutput(getOutputForCommand(inputValue));
            setInputValue('');
        }
    };
    
    const getOutputForCommand = (cmd: string): string => {
        const command = cmd.toLowerCase().trim();
        switch (command) {
            case 'help': return helpText;
            case 'about': return aboutMeText;
            case 'certifications': return 'Fetching certifications...\n\n' + certifications.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
            case 'contact': return contactInfo;
            default: return `Command not found: ${cmd}. Type 'help' for a list of commands.`;
        }
    };

    const handleTypewriterComplete = useCallback(() => {
        if(currentOutput) {
            setHistory(prev => [...prev, { command: `${PROMPT_PREFIX} ${prev[prev.length]?.command?.replace(PROMPT_PREFIX, '').trim() || ''}`, output: currentOutput }]);
            const lastCommand = history.length > 0 ? history[history.length -1].command.replace(PROMPT_PREFIX, '').trim() : '';
            if (lastCommand !== 'clear') {
               const cmd = currentOutput;
                const newHistoryItem = { command: `${PROMPT_PREFIX} ${lastCommand}`, output: cmd };
                
                const lastHistoryCommand = history[history.length - 1]?.command;
                if(lastHistoryCommand) {
                    const commandText = lastHistoryCommand.replace(PROMPT_PREFIX, "").trim();
                    const newOutput = getOutputForCommand(commandText);
                     setHistory(prev => [...prev.slice(0, prev.length), { command: lastHistoryCommand, output: newOutput }]);
                }
            }
        }
        setHistory(prev => {
            const lastCmdText = prev.length > 0 ? prev[prev.length-1].command : '';
            if (lastCmdText.includes('clear')) return [];
            
            const newHistory = [...prev];
            if(newHistory.length > 0 && currentOutput) {
                newHistory[newHistory.length-1].output = currentOutput;
            }
             return newHistory;
        });

        setIsExecuting(false);
        setCurrentOutput(null);
        inputRef.current?.focus();
    }, [currentOutput, history]);
    
     useEffect(() => {
        if (!isExecuting && !currentOutput) {
            inputRef.current?.focus();
        }
    }, [isExecuting, currentOutput]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-primary/60 bg-black/80 backdrop-blur-sm overflow-hidden" onClick={() => inputRef.current?.focus()}>
            <CardContent className="p-4 md:p-6 font-code text-sm text-primary h-[60vh] overflow-y-auto">
                {history.map((item, index) => (
                    <div key={index}>
                        <div>{item.command}</div>
                        <div className="text-foreground whitespace-pre-wrap">{item.output}</div>
                    </div>
                ))}

                {isExecuting && currentOutput && (
                    <div>
                        <div>{`${PROMPT_PREFIX} ${history.length > 0 ? history[history.length -1].command.replace(PROMPT_PREFIX, '') : ''}`}</div>
                         <TypewriterOutput text={currentOutput} onComplete={handleTypewriterComplete} />
                    </div>
                )}

                {!isExecuting && (
                    <div className="flex items-center">
                        <label htmlFor="terminal-input" className="shrink-0">{PROMPT_PREFIX}</label>
                        <input
                            ref={inputRef}
                            id="terminal-input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="bg-transparent border-none text-primary focus:ring-0 outline-none w-full pl-2"
                            autoComplete="off"
                            disabled={isExecuting}
                        />
                         {!isExecuting && <span className="terminal-cursor"></span>}
                    </div>
                )}
                 <div ref={endOfTerminalRef} />
            </CardContent>
        </Card>
    );
}

