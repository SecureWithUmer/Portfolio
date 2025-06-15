
"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import ParticlesBg with SSR turned off
const DynamicParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
  // You can add a loading component here if needed:
  // loading: () => <p>Loading background...</p>,
});

export function AnimatedBackground() {
  // State to ensure the component only renders client-side features after mounting
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // The base div styling for z-index, positioning, and background color
  // This ensures the background color is applied while waiting for particles,
  // and that the animated-bg class from globals.css is used.
  const wrapperDivClass = "fixed inset-0 -z-10 overflow-hidden animated-bg";

  if (!mounted) {
    // Render only the wrapper div on the server and before client-side mount
    // to prevent layout shifts and apply the base background color.
    return <div className={wrapperDivClass} aria-hidden="true" />;
  }

  return (
    <div className={wrapperDivClass} aria-hidden="true">
      {/* Render DynamicParticlesBg only when mounted on the client */}
      {/* Pass props directly to ensure they are applied */}
      <DynamicParticlesBg 
        type="cobweb" 
        color="#FFFFFF" // Explicit white hex color
        num={70}        // Increased number for better visibility
        bg={false}      // Explicitly set canvas background to transparent
      />
    </div>
  );
}
