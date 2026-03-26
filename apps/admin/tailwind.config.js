/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian sidebar
        sidebar: {
          DEFAULT: '#0c0c0f',
          hover: '#16161a',
          active: '#1e1e24',
          border: '#2a2a32',
          muted: '#6b6b7b',
        },
        // Warm sand accent
        accent: {
          DEFAULT: '#e8a951',
          hover: '#f0b962',
          muted: '#e8a95120',
          subtle: '#e8a95110',
        },
        // Content area
        surface: {
          DEFAULT: '#fafaf9',
          card: '#ffffff',
          raised: '#f5f5f4',
          border: '#e7e5e4',
          hover: '#f0efee',
        },
        // Status
        status: {
          draft: '#94a3b8',
          staged: '#f59e0b',
          published: '#22c55e',
          archived: '#6b7280',
        },
        // Text
        ink: {
          DEFAULT: '#1c1917',
          secondary: '#57534e',
          muted: '#a8a29e',
          inverse: '#fafaf9',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-sm': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '400' }],
        'heading': ['0.9375rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'overline': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        'panel': '1rem',
        'card': '0.75rem',
        'button': '0.5rem',
        'badge': '0.375rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
        'panel': '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'sidebar': '1px 0 0 0 #2a2a32',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
