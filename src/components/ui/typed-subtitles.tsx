
"use client";

import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';

interface TypedSubtitlesProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string; 
}

const TypedSubtitles: FC<TypedSubtitlesProps> = ({
  titles,
  typingSpeed = 120,
  deletingSpeed = 70, // Adjusted for faster backspacing
  pauseDuration = 1500,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const currentTitle = titles[currentIndex % titles.length];

    if (isDeleting) {
      if (subText.length > 0) {
        typingTimeoutRef.current = setTimeout(() => {
          setSubText(prev => prev.substring(0, prev.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting
        setIsDeleting(false);
        setCurrentIndex(prev => (prev + 1) % titles.length);
      }
    } else {
      // Typing
      if (subText.length < currentTitle.length) {
        typingTimeoutRef.current = setTimeout(() => {
          setSubText(prev => currentTitle.substring(0, prev.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing current title
        typingTimeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [subText, isDeleting, currentIndex, titles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {subText}
      <span className="terminal-cursor" aria-hidden="true"></span>
    </span>
  );
};

export default TypedSubtitles;
