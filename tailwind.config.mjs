/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Potentia Clinics palette — derived from logo (sage green hexagon + olive-lime spark + cream).
        // Class names kept identical to the Waterclub stack so the cloned components don't break.
        // Mapping: navy (dark/text/dark sections) | fresh-blue (primary CTA/accents)
        //          fresh-green (positive markers / "safe" check) | sand/mist (warm bgs).
        navy: '#2D3D33',          // deep forest — body text, dark band sections
        'fresh-blue': '#4A6755',  // sage primary — CTAs, accents, focus
        'fresh-green': '#B8C947', // olive-lime — positive markers, success badges
        teal: '#3A5343',          // (legacy alias) — slightly brighter sage for hover
        sand: '#F0EDD8',          // warm cream — page bg / soft sections
        mist: '#F7F4E2',          // pale cream — alternate calm bg
        bone: '#FFFFFF',          // pure white
        'text-muted': '#6F7A6E',  // warm sage muted helper text
        'text-on-dark': '#FFFFFF',
        'border-soft': '#D8DACF',
        'border-faint': 'rgba(45,61,51,0.07)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Inter Tight Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem, 6vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.875rem, 4.5vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.55' }],
        'body': ['1.0625rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.45' }],
        'stat': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: '6rem',
        'section-lg': '8rem',
      },
      maxWidth: {
        prose: '65ch',
      },
      borderRadius: {
        'pill': '9999px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stepIn: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 8px 24px -8px rgba(74,103,85,0.5)' },
          '50%':      { boxShadow: '0 12px 32px -6px rgba(74,103,85,0.8)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        wordIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'step-in': 'stepIn 250ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'cta-pulse': 'ctaPulse 2.4s ease-in-out infinite',
        'slide-right': 'slideInRight 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-left': 'slideInLeft 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'word-in': 'wordIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'cta': '0 8px 24px -8px rgba(74,103,85,0.5)',
        'card': '0 4px 20px -4px rgba(45,61,51,0.08)',
        'card-hover': '0 12px 32px -8px rgba(45,61,51,0.12)',
        'mobile-bar': '0 -8px 24px -8px rgba(45,61,51,0.12)',
      },
      // Safety net: any `ring-*` class that fails to compile (e.g. ring-{namedColor}/8
      // where 8 is not a standard Tailwind alpha step) used to silently fall back to
      // Tailwind's default blue-500 ring. Forcing the default to transparent means a
      // failed ring class renders invisible instead of leaking an off-brand blue line.
      // See memory `feedback_ring_alpha_must_be_standard_step.md` + Cushion 2026-05-12 +
      // Potentia 2026-05-13 incidents.
      ringColor: {
        DEFAULT: 'transparent',
      },
    },
  },
  plugins: [],
};
