
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { certifications } from '@/data/certifications';
import { projects } from '@/data/projects'; 

const PROMPT_PREFIX = "umer@portfolio:~$";
const TYPING_SPEED = 10;
const COMMAND_TYPING_SPEED = 25;

const initialOutput = `
Initializing Umer Farooq's portfolio v2.3...
- Passionate cybersecurity enthusiast from Faisalabad, Pakistan.
- Expertise in Threat Intelligence, Network Security, and Ethical Hacking.
- Committed to architecting robust digital defenses.

Type 'help' for a list of available commands.
`;

const helpText = `
Available commands:
  about          - Learn about me
  projects       - View my projects
  skills         - See my technical skills
  experience     - My work experience
  contact        - How to reach me
  education      - My educational background
  certifications - View my certifications
  leadership     - Leadership and community involvement
  sudo           - Request elevated privileges
  clear          - Clear the terminal
`;

const aboutMeText = `As a passionate cybersecurity enthusiast hailing from Faisalabad, Pakistan, I am deeply committed to the art and science of digital defense. My journey in cybersecurity is driven by a relentless curiosity to understand and mitigate evolving threats. I possess a diverse skill set encompassing threat intelligence, network security, ethical hacking, and security audits.`;

const skillsText = `
My core skills and expertise include:
- Threat Intelligence: Proactive identification and analysis of cyber threats.
- Network Security: Designing and implementing secure network architectures.
- Ethical Hacking: Simulating attacks to identify vulnerabilities.
- Security Audits: Ensuring compliance and identifying system vulnerabilities.
- Penetration Testing: Simulating real-world attacks to test defenses.
- Security Consulting: Providing guidance for robust cybersecurity strategies.
- MDR: Offering 24/7 threat detection and response.
`;

const experienceText = `
// Note: This is placeholder data.

[2022-Present] Senior Security Analyst at CyberCorp Inc.
  - Lead threat intelligence and incident response teams.
  - Develop and implement MDR solutions for enterprise clients.

[2020-2022] Penetration Tester at SecureNet Solutions
  - Conducted network and application penetration tests.
  - Provided detailed reports and remediation guidance.
`;

const educationText = `
// Note: This is placeholder data.

[2016-2020] Bachelor of Science in Computer Science
  - University of Agriculture, Faisalabad, Pakistan
  - Specialization in Network Security.
`;

const leadershipText = `
// Note: This is placeholder data.

- Founder of the "FSD Cyber-Wing", a local community for cybersecurity enthusiasts.
- Mentor for the "Code for Pakistan" initiative, guiding aspiring developers.
- Regular speaker at local tech meetups on topics of cybersecurity awareness.
`;


const contactInfo = `
You can reach me through the following channels:
- LinkedIn: https://www.linkedin.com/in/hackandsecurewithumer
- GitHub:   https://github.com/SecureWithUmer
- Email:    hackwithumer@outlook.com
`;

const commandMap = {
    'help': helpText,
    'about': aboutMeText,
    'projects': 'Fetching projects...\n\n' + projects.map(p => `- ${p.title}: ${p.description.substring(0, 60)}...`).join('\n'),
    'skills': skillsText,
    'experience': experienceText,
    'education': educationText,
    'certifications': 'Fetching certifications...\n\n' + certifications.map(c => `- ${c.title} (${c.issuingBody})`).join('\n'),
    'leadership': leadershipText,
    'contact': contactInfo,
    'sudo': 'User is not in the sudoers file. This incident will be reported.',
};


// --- Component Logic ---

const useTypewriter = (text: string, onComplete: () => void, speed: number) => {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        setTypedText('');
        if (!text) {
            onComplete();
            return;
        }
        let i = 0;
        const intervalId = setInterval(() => {
            setTypedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                onComplete();
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, onComplete, speed]);

    return typedText;
};

interface CommandHistory {
    command: string;
    output: string;
}

const TypewriterOutput: React.FC<{ text: string; speed: number; onComplete: () => void }> = ({ text, speed, onComplete }) => {
    const typedText = useTypewriter(text, onComplete, speed);
    return <div className="whitespace-pre-wrap">{typedText}</div>;
};

const CommandNav = ({ onCommandClick }: { onCommandClick: (cmd: string) => void }) => {
    const commands = Object.keys(commandMap);
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-1 p-1 text-primary">
            {commands.map((cmd, i) => (
                <React.Fragment key={cmd}>
                    <button onClick={() => onCommandClick(cmd)} className="hover:underline focus:underline outline-none">
                        {cmd}
                    </button>
                    {i < commands.length - 1 && <span className="text-muted-foreground">|</span>}
                </React.Fragment>
            ))}
             <button onClick={() => onCommandClick('clear')} className="hover:underline focus:underline outline-none">
                clear
            </button>
        </div>
    );
};

export function HackerTerminal() {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExecuting, setIsExecuting] = useState(true); // Start as true for initial output
    const [currentCommand, setCurrentCommand] = useState('');
    const [isInitialOutputDone, setIsInitialOutputDone] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        if(containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, isExecuting, scrollToBottom]);

     useEffect(() => {
        if (!isExecuting) {
          inputRef.current?.focus();
        }
    }, [isExecuting]);

    const getOutputForCommand = (cmd: string): string => {
        const command = cmd.toLowerCase().trim() as keyof typeof commandMap;
        return commandMap[command] || `Command not found: ${cmd}. Type 'help' for a list of commands.`;
    };
    
    const executeCommand = (cmd: string) => {
        if (cmd === 'clear') {
            setHistory([]);
            setInputValue('');
            return;
        }
        setCurrentCommand(cmd);
        setIsExecuting(true);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isExecuting) {
            e.preventDefault();
            executeCommand(inputValue.trim());
        }
    };
    
    const handleTypewriterComplete = useCallback(() => {
        if (!isInitialOutputDone) {
            setIsInitialOutputDone(true);
            setIsExecuting(false);
        } else {
            setHistory(prev => [...prev, { command: currentCommand, output: getOutputForCommand(currentCommand) }]);
            setIsExecuting(false);
            setCurrentCommand('');
        }
    }, [currentCommand, isInitialOutputDone]);

    const handleNavCommand = (cmd: string) => {
        if (isExecuting) return;
        setInputValue(cmd);
        executeCommand(cmd);
    };

    const TerminalPrompt = () => (
        <label htmlFor="terminal-input" className="shrink-0">
            <span className="text-accent">umer@portfolio</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary">~</span>
            <span className="text-muted-foreground">$</span>
        </label>
    );

    return (
        <div className="h-full w-full flex flex-col">
            <CommandNav onCommandClick={handleNavCommand} />
            <div ref={containerRef} className="flex-grow w-full font-code text-sm text-primary overflow-y-auto p-2" onClick={() => inputRef.current?.focus()}>
                {!isInitialOutputDone ? (
                    <TypewriterOutput text={initialOutput} speed={TYPING_SPEED} onComplete={handleTypewriterComplete} />
                ) : (
                    <>
                        <div className="text-foreground whitespace-pre-wrap">{initialOutput}</div>
                        {history.map((item, index) => (
                            <div key={index}>
                                <div className="flex items-center gap-2">
                                    <TerminalPrompt /> {item.command}
                                </div>
                                <div className="text-foreground whitespace-pre-wrap">{item.output}</div>
                            </div>
                        ))}

                        {isExecuting && currentCommand && (
                            <div>
                                <div className="flex items-center gap-2">
                                    <TerminalPrompt /> {currentCommand}
                                </div>
                                <TypewriterOutput text={getOutputForCommand(currentCommand)} speed={COMMAND_TYPING_SPEED} onComplete={handleTypewriterComplete} />
                            </div>
                        )}

                        {!isExecuting && (
                            <div className="flex items-center gap-2">
                                <TerminalPrompt />
                                <input
                                    ref={inputRef}
                                    id="terminal-input"
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent border-none text-primary focus:ring-0 outline-none w-full"
                                    autoComplete="off"
                                    disabled={isExecuting}
                                />
                                {!isExecuting && <span className="terminal-cursor"></span>}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
