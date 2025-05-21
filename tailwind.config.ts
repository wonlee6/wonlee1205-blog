import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import tailwindcssAnimate from 'tailwindcss-animate'

const linkHeadingStyles = {
  color: colors.gray[100],
  borderBottomColor: 'transparent',
  borderRadius: 3,
  boxShadow: `0 0 0 0.4rem transparent`,
  '&:hover': {
    color: 'none',
    borderBottomColor: 'transparent',
    background: colors.gray[100],
    boxShadow: `0 0 0 0.4rem ${colors.gray[100]}`
  }
}

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindcssAnimate, heroui()]
} satisfies Config

export default config
