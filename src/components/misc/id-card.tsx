
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export function IdCard() {
    return (
        <motion.div
            className="relative w-48 mx-auto"
            initial={{ y: -200, opacity: 0, rotate: -15 }}
            animate={{ 
                y: 0, 
                opacity: 1, 
                rotate: 0,
                transition: { 
                    type: 'spring', 
                    stiffness: 50, 
                    damping: 10,
                    duration: 0.8,
                    delay: 0.5 
                } 
            }}
        >
            {/* Lanyard Strap */}
            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 h-12 w-1 bg-gray-700 rounded-t-sm"></div>
            {/* Lanyard Clip */}
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 h-3 w-4 bg-gray-500 rounded-sm"></div>

            {/* ID Card */}
            <motion.div 
                className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-primary/20 backdrop-blur-sm bg-opacity-30"
                animate={{
                    rotate: [0, -2, 2, -2, 0], // Gentle sway
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2
                }}
            >
                <div className="bg-gray-900 p-2 text-center">
                    <span className="text-xs font-bold text-primary tracking-widest">CYBER-ID</span>
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
                <div className="bg-gray-900 p-2 text-center border-t border-gray-700">
                    <p className="text-sm font-semibold text-foreground">Umer Farooq</p>
                    <p className="text-xs text-muted-foreground">Authorized Personnel</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
