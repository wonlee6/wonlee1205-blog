import {Analytics} from '@vercel/analytics/react'
import {Inter} from 'next/font/google'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {Providers} from './provider'

import '../styles/globals.css'
import HeaderNaviBar from '@/components/navigation'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='light' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <HeaderNaviBar />

          <div className='relative flex min-h-screen flex-col'>
            <main className='flex-1'>{children}</main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
