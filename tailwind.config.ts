import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */

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
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
        // 'lol-bg': "url('../public/images/lol/lol-bg.jpeg')",
        // 'lol-bg2': "url('../public/images/lol/lol-bg2.jpg')"
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
  plugins: [typography, nextui()]
} satisfies Config

export default config
