import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './provider'
import { Fira_Code } from 'next/font/google'

import '../styles/globals.css'
import HeaderNaviBar from '@/components/navigation'
import { Toaster } from '@/components/ui/toaster'

const inter = Fira_Code({ subsets: ['cyrillic'] })
// const myFont = localFont({ src: 'font/FiraCode-SemiBold.woff2', display: 'swap' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning className='light' lang='ko'>
      <body className={inter.className}>
        <Providers>
          <div className='relative flex min-h-dvh flex-col'>
            <HeaderNaviBar />
            <main className='flex grow'>{children}</main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  )
}
