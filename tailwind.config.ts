
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    'src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Source Code Pro', 'monospace'], // Changed from Inter
        headline: ['Orbitron', 'sans-serif'], // Changed from Space Grotesk for more cyber feel
        code: ['Source Code Pro', 'monospace'], // Consistent code font
        cyberName: ['Orbitron', 'sans-serif'], // Specific for the name
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-in-down': {
          'from': { opacity: '0', transform: 'translateY(-30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'glitch': { // Simplified glitch for better performance if needed
          '0%, 100%': { transform: 'translate(0, 0)', textShadow: '1px 1px 0px hsl(var(--primary) / 0.3), -1px -1px 0px hsl(var(--accent) / 0.3)'},
          '25%': { transform: 'translate(1px, -1px)', textShadow: '-1px 1px 0px hsl(var(--primary) / 0.3), 1px -1px 0px hsl(var(--accent) / 0.3)'},
          '50%': { transform: 'translate(-1px, 1px)', textShadow: '1px -1px 0px hsl(var(--primary) / 0.3), -1px 1px 0px hsl(var(--accent) / 0.3)'},
          '75%': { transform: 'translate(0px, 1px)', textShadow: '-1px -1px 0px hsl(var(--primary) / 0.3), 1px 1px 0px hsl(var(--accent) / 0.3)'},
        },
        'neon-glow-primary': { // More subtle neon glow
          '0%, 100%': {
            textShadow: '0 0 3px hsl(var(--primary)), 0 0 6px hsl(var(--primary) / 0.8), 0 0 9px hsl(var(--primary) / 0.6)',
          },
          '50%': {
            textShadow: '0 0 4px hsl(var(--primary)), 0 0 8px hsl(var(--primary) / 0.8), 0 0 12px hsl(var(--primary) / 0.6)',
          },
        },
         blink: { // Ensure blink is defined if used by new loader's CSS
          '0%, 100%': { backgroundColor: 'transparent', boxShadow: 'none' },
          '50%': { backgroundColor: 'hsl(var(--primary))', boxShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-down': 'slideInDown 0.7s ease-out forwards',
        'glitch': 'glitch 0.25s infinite alternate', // Faster, alternating glitch
        'neon-glow-primary': 'neon-glow-primary 2s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite', // Ensure blink is usable by Tailwind
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

    