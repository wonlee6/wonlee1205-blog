import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './provider'

import '../styles/globals.css'
import HeaderNaviBar from '@/components/navigation'
import localFont from 'next/font/local'

const myFont = localFont({ src: '../public/font/FiraCode-SemiBold.woff2', display: 'swap' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning className='light' lang='ko'>
      <body className={myFont.className}>
        <Providers>
          <div className='relative flex min-h-dvh flex-col'>
            <HeaderNaviBar />

            <main className='flex flex-auto'>{children}</main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
