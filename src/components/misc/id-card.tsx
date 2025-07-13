
"use client";

import Image from 'next/image';

export function IdCard() {
    return (
        <div className="relative w-48 mx-auto">
            {/* Lanyard Strap */}
            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 h-12 w-1 bg-gray-700 rounded-t-sm"></div>
            {/* Lanyard Clip */}
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 h-3 w-4 bg-gray-500 rounded-sm"></div>

            {/* ID Card */}
            <div className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-primary/20 backdrop-blur-sm bg-opacity-30">
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
            </div>
        </div>
    );
}
