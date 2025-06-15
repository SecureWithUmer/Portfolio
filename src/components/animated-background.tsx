
// src/components/animated-background.tsx
"use client";

import type { Container } from "@tsparticles/engine";
import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// Corrected import from tsparticles-slim
import { loadSlim } from "@tsparticles/slim"; 

export function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles container loaded:', container);
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", 
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
            }
          },
          push: {
            quantity: 2,
          },
        },
      },
      particles: {
        color: {
          value: "hsl(170 100% 48%)", // Hardcoded primary color
        },
        links: {
          color: "hsl(170 100% 48%)", // Hardcoded primary color
          distance: 150,
          enable: true,
          opacity: 0.3, // Increased link opacity
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out", 
          },
          random: true,
          speed: 1, // Increased particle speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, 
          },
          value: 60, // Increased particle count
        },
        opacity: {
          value: 0.5, // Increased particle opacity
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 1.5 }, 
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: false, 
      }
    }),
    []
  );

  if (!init) {
    // Fallback while particles are initializing
    return <div className="fixed inset-0 -z-10 overflow-hidden animated-bg" aria-hidden="true" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden animated-bg" aria-hidden="true">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options as any} 
        className="h-full w-full" 
      />
    </div>
  );
}

