/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#082B59',
          50: '#EAF1F9',
          100: '#D2E2F3',
          200: '#A6C5E7',
          300: '#6F9BD3',
          400: '#3A6FAE',
          500: '#1A4A85',
          600: '#103767',
          700: '#0B2A50',
          800: '#082B59',
          900: '#051D3E',
        },
        brand: {
          DEFAULT: '#0876D9',
          50: '#EAF4FC',
          100: '#D2E8F9',
          200: '#A6D1F3',
          300: '#6FB3E8',
          400: '#3A96DD',
          500: '#0876D9',
          600: '#0660B8',
          700: '#054D91',
          800: '#043B6E',
          900: '#022A4E',
        },
        cyan: {
          DEFAULT: '#00BFD8',
          50: '#E6FBFE',
          100: '#C7F4FB',
          200: '#8FE9F7',
          300: '#4BDBF1',
          400: '#18CCE6',
          500: '#00BFD8',
          600: '#009FB5',
          700: '#007E8F',
          800: '#005E6A',
          900: '#003F47',
        },
        accent: {
          yellow: '#F5C400',
        },
        cloud: {
          50: '#FFFFFF',
          100: '#F7F9FC',
          200: '#F3F7FB',
          300: '#EAF0F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(8, 43, 89, 0.06), 0 4px 20px -4px rgba(8, 43, 89, 0.05)',
        card: '0 4px 24px -8px rgba(8, 43, 89, 0.10), 0 1px 3px rgba(8, 43, 89, 0.04)',
        'card-hover': '0 12px 40px -12px rgba(8, 43, 89, 0.18), 0 2px 6px rgba(8, 43, 89, 0.06)',
        glow: '0 8px 60px -12px rgba(8, 118, 217, 0.25)',
      },
      maxWidth: {
        '7xl': '1280px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-down': 'slide-down 0.25s ease-out',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
