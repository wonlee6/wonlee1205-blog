import {ReactNode} from 'react'
import {Analytics} from '@vercel/analytics/react'
import {Providers} from './providers'
import {Inter} from 'next/font/google'

import './globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

import Nav from './nav'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className={`h-full bg-white dark:bg-black dark:text-white`}>
            <Nav />
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  )
}
