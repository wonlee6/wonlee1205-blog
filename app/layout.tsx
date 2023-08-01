import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from 'react'
import Nav from './nav'
import Footer from './footer'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import {Analytics} from '@vercel/analytics/react'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: '꼬비 집사의 공부 블로그',
  description: '프론트 엔드 관련 정리'
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main
          className={`h-full bg-white text-gray-800 dark:bg-black dark:text-white`}>
          <Nav />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  )
}
