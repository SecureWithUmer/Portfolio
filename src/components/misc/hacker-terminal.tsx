
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { certifications } from '@/data/certifications';
import { projects } from '@/data/projects'; // Import project data

const PROMPT_PREFIX = "umer@portfolio:~$";
const TYPING_SPEED = 20;

// --- Command Outputs ---
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

// --- Component Logic ---

const useTypewriter = (text: string, onComplete: () => void) => {
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
        }, TYPING_SPEED);

        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return typedText;
};

interface CommandHistory {
    command: string;
    output: string;
}

const TypewriterOutput: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
    const typedText = useTypewriter(text, onComplete);
    return <div className="whitespace-pre-wrap">{typedText}</div>;
};

export function HackerTerminal() {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [currentCommand, setCurrentCommand] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        const command = cmd.toLowerCase().trim();
        switch (command) {
            case 'help':
                return helpText;
            case 'about':
                return aboutMeText;
            case 'projects':
                 return 'Fetching projects...\n\n' + projects.map(p => `- ${p.title}: ${p.description.substring(0, 60)}...`).join('\n');
            case 'skills':
                return skillsText;
            case 'experience':
                return experienceText;
            case 'education':
                return educationText;
            case 'certifications':
                return 'Fetching certifications...\n\n' + certifications.map(c => `- ${c.title} (${c.issuingBody})`).join('\n');
            case 'leadership':
                return leadershipText;
            case 'contact':
                return contactInfo;
            case '':
                return '';
            default:
                return `Command not found: ${cmd}. Type 'help' for a list of commands.`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isExecuting) {
            e.preventDefault();
            const cmd = inputValue.trim();

            if (cmd === 'clear') {
                setHistory([]);
                setInputValue('');
                return;
            }
            
            setCurrentCommand(cmd);
            setIsExecuting(true);
            setInputValue('');
        }
    };
    
    const handleTypewriterComplete = useCallback(() => {
        setHistory(prev => [...prev, { command: currentCommand, output: getOutputForCommand(currentCommand) }]);
        setIsExecuting(false);
        setCurrentCommand('');
    }, [currentCommand]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-primary/60 bg-black/80 backdrop-blur-sm overflow-hidden" onClick={() => inputRef.current?.focus()}>
            <CardContent className="p-4 md:p-6 font-code text-sm text-primary h-[60vh] overflow-y-auto">
                <div className="text-foreground whitespace-pre-wrap">
                    Welcome to UmerFarooq.Cyber. Type 'help' to see available commands.
                </div>
                <br />
                {history.map((item, index) => (
                    <div key={index}>
                        <div>{PROMPT_PREFIX} {item.command}</div>
                        <div className="text-foreground whitespace-pre-wrap">{item.output}</div>
                    </div>
                ))}

                {isExecuting && (
                     <div>
                        <div>{PROMPT_PREFIX} {currentCommand}</div>
                        <TypewriterOutput text={getOutputForCommand(currentCommand)} onComplete={handleTypewriterComplete} />
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
                            onKeyDown={handleKeyDown}
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
