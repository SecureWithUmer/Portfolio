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
        body: ['Source Code Pro', 'monospace'],
        headline: ['Source Code Pro', 'monospace'],
        code: ['Source Code Pro', 'monospace'],
        cyberName: ['Orbitron', 'sans-serif'],
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
        'glitch': {
          '0%': {
            transform: 'translate(0)',
            textShadow: '1px 1px 0px hsl(var(--primary) / 0.5), -1px -1px 0px hsl(var(--accent) / 0.5)',
          },
          '25%': {
            transform: 'translate(2px, -2px)',
            textShadow: '-1px 1px 0px hsl(var(--primary) / 0.5), 1px -1px 0px hsl(var(--accent) / 0.5)',
          },
          '50%': {
            transform: 'translate(-2px, 2px)',
            textShadow: '1px -1px 0px hsl(var(--primary) / 0.5), -1px 1px 0px hsl(var(--accent) / 0.5)',
          },
          '75%': {
            transform: 'translate(2px, 2px)',
            textShadow: '-1px -1px 0px hsl(var(--primary) / 0.5), 1px 1px 0px hsl(var(--accent) / 0.5)',
          },
          '100%': {
            transform: 'translate(0)',
            textShadow: '1px 1px 0px hsl(var(--primary) / 0.5), -1px -1px 0px hsl(var(--accent) / 0.5)',
          },
        },
        'neon-glow-primary': {
          '0%, 100%': {
            textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.8), 0 0 25px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.4), 0 0 35px hsl(var(--primary) / 0.2)',
          },
          '50%': {
            textShadow: '0 0 7px hsl(var(--primary)), 0 0 12px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 28px hsl(var(--primary) / 0.8), 0 0 35px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.4), 0 0 50px hsl(var(--primary) / 0.2)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-down': 'slideInDown 0.7s ease-out forwards',
        'glitch': 'glitch 0.3s infinite',
        'neon-glow-primary': 'neon-glow-primary 2.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
