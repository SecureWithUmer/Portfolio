
"use client";

import ParticlesBg from 'particles-bg';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  // particles-bg can sometimes cause hydration mismatches if rendered immediately.
  // Deferring its rendering until client-side mount can help.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return the basic div structure for z-index and positioning
    // This ensures the background color is applied while waiting for particles.
    return <div className="fixed inset-0 -z-10 overflow-hidden animated-bg" aria-hidden="true" />;
  }

  // Using HSL value directly as particles-bg might not resolve CSS vars easily
  const primaryColorHsl = "hsl(170 100% 48%)"; // Your cyber green

  // Configuration for particles-bg
  // You can experiment with different types: "cobweb", "lines", "polygon", "circle", "square", "tadpole", etc.
  // "cobweb" or "lines" are good for a network/cyber feel.
  // `num` controls density.
  // `bg={false}` is crucial to let the theme's background show through.
  const config = {
    type: "cobweb",
    color: primaryColorHsl,
    num: 50, // Adjust for desired density and performance
    bg: false, // Set to false to use the background from .animated-bg in globals.css
    // Other type-specific props might be available, e.g., for "cobweb":
    // lineWidth: 1,
    // distance: 150,
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden animated-bg" aria-hidden="true">
      <ParticlesBg {...config} />
    </div>
  );
}
