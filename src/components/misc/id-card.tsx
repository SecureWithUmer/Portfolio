
"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';

export function IdCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const { toast } = useToast();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20, mass: 1 };

    const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), springConfig);
    const translateX = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [-150, 150], [-5, 5]), springConfig);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isScanning) {
        setScanProgress(0);
        const totalDuration = 2800;
        const intervalDuration = 50;
        const steps = totalDuration / intervalDuration;
        const increment = 100 / steps;

        let currentProgress = 0;
        timer = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= 100) {
            setScanProgress(100);
            clearInterval(timer);
            } else {
            setScanProgress(currentProgress);
            }
        }, intervalDuration);
        }
        return () => clearInterval(timer);
    }, [isScanning]);

    const handleResumeDownload = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsScanning(true);

        setTimeout(() => {
        setIsScanning(false);
        setScanProgress(100);
        const link = document.createElement('a');
        link.href = '/assets/resume.pdf';
        link.download = 'Umer_Farooq_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Download Started", description: "Your resume download should begin shortly." });
        }, 3000);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-56 sm:w-64 mx-auto md:w-full"
            style={{ perspective: '1200px' }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div 
                className="bg-card/80 border-2 border-border rounded-xl overflow-hidden shadow-2xl shadow-primary/20 backdrop-blur-sm"
                style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="p-3">
                    <Image
                        src="/assets/profile-picture.png"
                        alt="Umer Farooq"
                        width={150}
                        height={150}
                        className="rounded-lg w-full h-auto grayscale"
                        data-ai-hint="professional headshot"
                        priority
                    />
                </div>
                <div className="bg-secondary p-3 text-center border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-3">Umer Farooq</p>
                     {isScanning ? (
                        <div className="flex flex-col items-center space-y-1 h-[34px] justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <p className="text-muted-foreground text-xs">Scanning...</p>
                            <Progress value={scanProgress} className="w-full max-w-[100px] mx-auto mt-1 h-1" />
                        </div>
                        ) : (
                        <Button
                            size="sm"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-1.5 text-xs w-full max-w-[150px] mx-auto h-[34px]"
                            onClick={handleResumeDownload}
                        >
                            Download Resume <Download className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
