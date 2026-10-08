
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { certifications } from '@/data/certifications';
import { projects } from '@/data/projects'; 

const PROMPT_PREFIX = "@securewithumer:~$";
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
Hello! I'm Umer Farooq, a Penetration Tester and cybersecurity specialist from Faisalabad, Pakistan.

My journey in offensive security is driven by a deep curiosity to uncover, dissect, and remediate complex vulnerabilities across web applications, networks, and cloud infrastructure.

I specialize in penetration testing, threat modeling, and bug bounty research to harden defenses and safeguard critical digital assets.
${NEXT_STEPS_PROMPT}`;

const skillsText = `
Here are my core skills and areas of expertise:

- Offensive Security: Penetration Testing, API Pen Testing, Vulnerability Research.
- Defense & Infrastructure: Network Security, Cloud Security, Linux system hardening.
- Security Operations: Wazuh SIEM monitoring, threat detection, and incident remediation.
- Tooling & Platforms: BurpSuite, Kali Linux, Frida, Postman, and custom exploitation scripts.
${NEXT_STEPS_PROMPT}`;

const experienceText = `
Professional Experience:

[03/2023 - Present] Penetration Tester at Bugcrowd
  - Conduct offensive security assessments on enterprise targets.
  - Identify and responsibly disclose critical vulnerabilities across web, API, and cloud assets.

[03/2023 - Present] Penetration Tester at HackerOne
  - Perform in-depth penetration testing, exploit development, and security research.
  - Collaborate with security engineering teams globally to validate and remediate high-severity flaws.
${NEXT_STEPS_PROMPT}`;

const educationText = `
Education:

[08/2020 - 08/2022] FSC-Pre Medical at Aspire Group of Colleges
${NEXT_STEPS_PROMPT}`;

const leadershipText = `
Achievements & Recognition:

- Inducted into Bugcrowd & HackerOne Hall of Fame for identifying critical security vulnerabilities.
- Received formal security acknowledgments and responsible disclosure honors from LAAM Technologies and Switch Payment Gateway.
- Active contributor to the ethical hacking and bug bounty communities, advocating for proactive defense and responsible disclosure.
${NEXT_STEPS_PROMPT}`;


const contactInfo = `
You can reach me through the following channels:

- LinkedIn: https://www.linkedin.com/in/securewithumer
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
    const technical = certifications.filter(c => c.category === 'technical' || !c.category);
    const nonTechnical = certifications.filter(c => c.category === 'non-technical');

    let text = "Fetching certifications...\n\n";
    text += "=== Technical Certifications ===\n";
    text += technical.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
    text += "\n\n=== Non-Technical Certifications ===\n";
    text += nonTechnical.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
    return `${text}\n${NEXT_STEPS_PROMPT}`;
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
            <span className="text-accent">@securewithumer</span>
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
                                <span>{inputValue}</span>
                                <span className="terminal-cursor"></span>
                                <input
                                    ref={inputRef}
                                    id="terminal-input"
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="absolute -left-[9999px]" // Visually hide the input but keep it focusable
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
