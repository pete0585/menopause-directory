import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#5C2D6E',
          'plum-dark': '#3D1D4A',
          'plum-light': '#7A4090',
          rose: '#D4637A',
          'rose-light': '#E8899A',
          'rose-dark': '#B84D63',
          sage: '#6B8F71',
          'sage-light': '#8DAF93',
          'sage-dark': '#4E6B53',
          cream: '#FDF8F5',
          'cream-dark': '#F5EDE6',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FDF8F5 0%, #F5EDE6 100%)',
      },
    },
  },
  plugins: [],
}

export default config
