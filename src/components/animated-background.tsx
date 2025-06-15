// src/components/animated-background.tsx
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "react-tsparticles";
import type { Container } from "tsparticles-engine";
// Corrected import from tsparticles-slim
import { loadSlim } from "tsparticles-slim"; 

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
    // You can do something here once particles are loaded
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
          value: "hsl(var(--primary))", 
        },
        links: {
          color: "hsl(var(--primary))",
          distance: 150,
          enable: true,
          opacity: 0.1, 
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out", 
          },
          random: true,
          speed: 0.3, 
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 900, 
          },
          value: 40, 
        },
        opacity: {
          value: 0.2, 
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
