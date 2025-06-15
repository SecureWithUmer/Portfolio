
"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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

  // Configuration for particles-bg
  // Using white for particles for better contrast against the dark background
  const particleColor = "hsl(0 0% 100%)"; // White
  const config = {
    type: "cobweb", // You can experiment with "lines", "polygon", "circle", etc.
    color: particleColor,
    num: 50, // Adjust for desired density and performance
    bg: false, // Set to false to use the background from .animated-bg in globals.css
  };

  return (
    <div className={wrapperDivClass} aria-hidden="true">
      {/* Render DynamicParticlesBg only when mounted on the client */}
      <DynamicParticlesBg {...config} />
    </div>
  );
}
