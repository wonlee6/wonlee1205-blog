import type {Config} from 'tailwindcss'
import {nextui} from '@nextui-org/react'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'lol-bg': "url('../public/images/lol/lol-bg.jpeg')",
        'lol-bg2': "url('../public/images/lol/lol-bg2.jpg')"
      }
    }
  },
  plugins: [typography, nextui()]
} satisfies Config

export default config
