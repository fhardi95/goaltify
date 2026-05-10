import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0faf4',
          100: '#d6f0e1',
          200: '#ace0c3',
          400: '#4db882',
          500: '#1a7a3f',
          600: '#155f32',
          700: '#0f4524',
          800: '#0a2e18',
          900: '#05170c',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
