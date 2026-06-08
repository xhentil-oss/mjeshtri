/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#eef4fb',
          100: '#d6e4f3',
          200: '#aec9e7',
          300: '#7ba6d6',
          400: '#4a7fbf',
          500: '#2c5d9e',
          600: '#1f467c',
          700: '#163a64',
          800: '#102c4c',
          900: '#0a2540',
          950: '#061829',
        },
        amber: {
          50: '#fff6ed',
          100: '#ffe9d2',
          200: '#ffce9f',
          300: '#ffac63',
          400: '#ff8a33',
          500: '#ff7a1a',
          600: '#f15c00',
          700: '#c74400',
          800: '#9e3705',
          900: '#7f300a',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        ink: '#0f172a',
        mist: '#f6f8fb',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,37,64,0.04), 0 8px 24px rgba(10,37,64,0.06)',
        cardhover: '0 4px 8px rgba(10,37,64,0.06), 0 16px 40px rgba(10,37,64,0.10)',
        soft: '0 1px 3px rgba(10,37,64,0.06)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
      },
    },
  },
  plugins: [],
}
