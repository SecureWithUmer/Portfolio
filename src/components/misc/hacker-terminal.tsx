
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { certifications } from '@/data/certifications';
import { projects } from '@/data/projects'; 

const PROMPT_PREFIX = "umer@portfolio:~$";
const TYPING_SPEED = 10;
const COMMAND_TYPING_SPEED = 20; // Slightly faster for commands

const NEXT_STEPS_PROMPT = "\nFeel free to explore more using the 'projects', 'skills', or 'contact' commands!";

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
  clear          - Clear the terminal
`;

const aboutMeText = `
Hello! I'm Umer Farooq, a cybersecurity enthusiast from Faisalabad, Pakistan.

My journey in this field is driven by a deep-seated curiosity to understand and mitigate the complex, evolving threats in our digital world.

I specialize in architecting robust security solutions and thrive on dissecting complex challenges to protect digital assets and ensure operational resilience.
${NEXT_STEPS_PROMPT}`;

const skillsText = `
Here are my core skills and areas of expertise:

- Threat Intelligence: Proactive identification and analysis of cyber threats.
- Network Security: Designing and implementing secure network architectures.
- Ethical Hacking: Simulating attacks to identify vulnerabilities.
- Security Audits: Ensuring compliance and identifying system vulnerabilities.
- Penetration Testing: Simulating real-world attacks to test defenses.
- Security Consulting: Providing guidance for robust cybersecurity strategies.
- MDR: Offering 24/7 threat detection and response.
${NEXT_STEPS_PROMPT}`;

const experienceText = `
// Note: This is a summary. For full details, please contact me.

[2022-Present] Senior Security Analyst at CyberCorp Inc.
  - Lead threat intelligence and incident response teams.
  - Develop and implement MDR solutions for enterprise clients.

[2020-2022] Penetration Tester at SecureNet Solutions
  - Conducted network and application penetration tests.
  - Provided detailed reports and remediation guidance.
${NEXT_STEPS_PROMPT}`;

const educationText = `
Currently pursuing BS Cyber Security from The University of Lahore - UOL (2025 - 2029).
${NEXT_STEPS_PROMPT}`;

const leadershipText = `
// Note: This is placeholder data.

- Founder of the "FSD Cyber-Wing", a local community for cybersecurity enthusiasts.
- Mentor for the "Code for Pakistan" initiative, guiding aspiring developers.
- Regular speaker at local tech meetups on topics of cybersecurity awareness.
${NEXT_STEPS_PROMPT}`;


const contactInfo = `
You can reach me through the following channels:

- LinkedIn: https://www.linkedin.com/in/hackandsecurewithumer
- GitHub:   https://github.com/SecureWithUmer
- Email:    hackwithumer@outlook.com
${NEXT_STEPS_PROMPT}`;

const projectIntros = {
  '1': "Secured a financial institution's network with a modern Zero Trust model.",
  '2': "Built an automated system to keep cloud environments safe and compliant.",
  '3': "Played the role of a hacker to test a healthcare provider's cyber defenses.",
  '4': "Helped a SaaS company build more secure software from the ground up.",
  '5': "Launched a 24/7 security monitoring service to protect clients from threats.",
  '6': "Created fun hacking challenges for a cybersecurity competition.",
  '7': "Took apart Android malware to see how it works and how to stop it.",
};


const getProjectsText = () => {
    const projectList = projects.map(p => {
        const intro = projectIntros[p.id as keyof typeof projectIntros] || "A cool cybersecurity project.";
        return `- ${p.title}: ${intro}`;
    }).join('\n');
    return `Fetching projects...\n\n${projectList}\n${NEXT_STEPS_PROMPT}`;
};

const getCertificationsText = () => {
    const certList = certifications.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
    return `Fetching certifications...\n\n${certList}\n${NEXT_STEPS_PROMPT}`;
};


const commandMap = {
    'help': helpText,
    'about': aboutMeText,
    'projects': getProjectsText(),
    'skills': skillsText,
    'experience': experienceText,
    'education': educationText,
    'certifications': getCertificationsText(),
    'leadership': leadershipText,
    'contact': contactInfo,
};


// --- Component Logic ---

interface CommandHistory {
    command: string;
    output: string;
}

const TypewriterOutput: React.FC<{ text: string; speed: number; onComplete: () => void }> = ({ text, speed, onComplete }) => {
    const [typedText, setTypedText] = useState('');
    const textRef = useRef(text);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        textRef.current = text;
        setTypedText('');
    }, [text]);

    useEffect(() => {
        const type = () => {
            if (typedText.length < textRef.current.length) {
                setTypedText(prev => textRef.current.slice(0, prev.length + 1));
            } else {
                if(timeoutRef.current) clearTimeout(timeoutRef.current);
                onComplete();
            }
        };
        timeoutRef.current = setTimeout(type, speed);
        
        return () => clearTimeout(timeoutRef.current);
    }, [typedText, onComplete, speed]);

    return <div className="whitespace-pre-wrap">{typedText}</div>;
};
TypewriterOutput.displayName = 'TypewriterOutput';

const CommandNav = ({ onCommandClick }: { onCommandClick: (cmd: string) => void }) => {
    const commands = Object.keys(commandMap);
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-1 p-1 text-accent">
            {commands.map((cmd) => (
                <React.Fragment key={cmd}>
                    <button onClick={() => onCommandClick(cmd)} className="hover:underline focus:underline outline-none">
                        {cmd}
                    </button>
                    <span className="text-muted-foreground">|</span>
                </React.Fragment>
            ))}
             <button onClick={() => onCommandClick('clear')} className="hover:underline focus:underline outline-none">
                clear
            </button>
        </div>
    );
};
CommandNav.displayName = 'CommandNav';

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
        if (isExecuting) return;
        if (cmd.toLowerCase().trim() === 'clear') {
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
        <div className="h-full w-full flex flex-col p-1 sm:p-2">
            <CommandNav onCommandClick={handleNavCommand} />
            <div ref={containerRef} className="flex-grow w-full font-code text-sm text-primary overflow-y-auto p-2" onClick={() => inputRef.current?.focus()}>
                {!isInitialOutputDone ? (
                    <TypewriterOutput text={initialOutput} speed={TYPING_SPEED} onComplete={handleTypewriterComplete} />
                ) : (
                    <>
                        <div className="text-foreground whitespace-pre-wrap">{initialOutput}</div>
                        {history.map((item, index) => (
                            <div key={index} className="mt-2">
                                <div className="flex items-center gap-2">
                                    <TerminalPrompt /> {item.command}
                                </div>
                                <div className="text-foreground whitespace-pre-wrap">{item.output}</div>
                            </div>
                        ))}

                        {isExecuting && currentCommand && (
                            <div className="mt-2">
                                <div className="flex items-center gap-2">
                                    <TerminalPrompt />
                                     <TypewriterOutput text={currentCommand} speed={COMMAND_TYPING_SPEED} onComplete={() => {}} />
                                </div>
                                <TypewriterOutput text={getOutputForCommand(currentCommand)} speed={TYPING_SPEED} onComplete={handleTypewriterComplete} />
                            </div>
                        )}

                        {!isExecuting && (
                            <div className="flex items-center gap-2 mt-2">
                                <TerminalPrompt />
                                  <input
                                      ref={inputRef}
                                      id="terminal-input"
                                      type="text"
                                      value={inputValue}
                                      onChange={(e) => setInputValue(e.target.value)}
                                      onKeyDown={handleKeyDown}
                                      className="bg-transparent border-none text-primary focus:ring-0 outline-none w-auto"
                                      autoComplete="off"
                                      autoCapitalize="off"
                                      autoCorrect="off"
                                      disabled={isExecuting}
                                  />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
