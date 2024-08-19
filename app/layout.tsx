import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './provider'
import { Fira_Code } from 'next/font/google'

import '../styles/globals.css'
import HeaderNavBar from '@/components/navigation'
import { Toaster } from '@/components/ui/toaster'

const inter = Fira_Code({ subsets: ['cyrillic'] })
// const myFont = localFont({ src: 'font/FiraCode-SemiBold.woff2', display: 'swap' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='ko'>
      <body className={inter.className}>
        <Providers>
          <div className='relative flex h-dvh flex-col overflow-hidden'>
            <HeaderNavBar />
            <main className='flex h-auto grow overflow-y-auto'>{children}</main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  )
}
