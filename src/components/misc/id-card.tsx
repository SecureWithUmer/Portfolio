
"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function IdCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20, mass: 1 };

    const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), springConfig);
    const translateX = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [-150, 150], [-5, 5]), springConfig);

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
            className="relative w-56 mx-auto mt-12"
            style={{ perspective: '1200px' }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ID Card */}
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
                <div className="bg-secondary p-2 text-center border-b border-border">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">Cyber-ID</span>
                </div>
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
                <div className="bg-secondary p-2 text-center border-t border-border">
                    <p className="text-sm font-semibold text-foreground">Umer Farooq</p>
                    <p className="text-xs text-muted-foreground">Authorized Personnel</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
