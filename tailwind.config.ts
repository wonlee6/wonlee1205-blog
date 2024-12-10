import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'
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
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
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
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            pre: {
              background: 'rgba(205, 200, 255, 0.05)',
              code: {
                fontSize: '1rem'
              }
            },
            'h2 a': linkHeadingStyles,
            'h3 a': linkHeadingStyles,
            'h4 a': linkHeadingStyles,
            'h5 a': linkHeadingStyles,
            'h6 a': linkHeadingStyles,
            'h3 a:has(code)': {
              boxShadow: `0 0 0 0.3rem transparent`,
              '&:hover': {
                background: colors.teal[900],
                boxShadow: `0 0 0 0.3rem ${colors.teal[900]}`
              }
            },
            figure: {
              margin: 0
            },
            blockquote: {
              fontSize: '90%',
              color: colors.emerald[500],
              borderLeftColor: colors.emerald[400],
              backgroundColor: '#f8f9fa',
              padding: '0.1rem 0.1rem 0.1rem 1rem',
              'p::before': { display: 'none' },
              'p::after': { display: 'none' }
            },
            a: {
              textDecoration: 'none',
              borderBottom: `1px solid ${colors.pink[300]}`,
              color: colors.pink[200],
              borderRadius: 1,
              transitionProperty: 'color, border-color, background, box-shadow',
              transitionDuration: '0.18s',
              boxShadow: `0 0 0 0.2rem transparent`,
              '&:hover': {
                color: `${colors.zinc[900]}`,
                borderBottomColor: `${colors.pink[200]}`,
                background: colors.pink[200],
                boxShadow: `0 0 0 0.2rem ${colors.pink[200]}`
              }
            },
            code: {
              color: colors.teal[500],
              '&::before': { content: `unset !important` },
              '&::after': { content: `unset !important` },
              fontWeight: 'normal'
            },
            'a code': {
              fontSize: '1em'
            },
            '[data-rehype-pretty-code-fragment]:nth-of-type(2) pre': {
              '[data-line]::before': {
                content: 'counter(line)',
                counterIncrement: 'line',
                display: 'inline-block',
                width: '1rem',
                marginRight: '1rem',
                textAlign: 'right',
                color: colors.slate[600]
              },
              '[data-highlighted-line]::before': {
                color: colors.slate[400]
              }
            }
          }
        }
      })
    }
  },
  plugins: [tailwindcssAnimate, typography, nextui()]
} satisfies Config
// { themes: { dark: {layout: { backgroundColor: '#121212' }} } }
export default config
