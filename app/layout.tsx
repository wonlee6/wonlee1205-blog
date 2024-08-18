import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from './provider'
import { Fira_Code } from 'next/font/google'

import '../styles/globals.css'
import HeaderNaviBar from '@/components/navigation'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Fira_Code({ subsets: ['cyrillic'] })
// const myFont = localFont({ src: 'font/FiraCode-SemiBold.woff2', display: 'swap' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning className='light' lang='ko'>
        <body className={inter.className}>
          <Providers>
            <div className='relative flex h-dvh flex-col'>
              <HeaderNaviBar />
              <main className='flex grow overflow-auto'>{children}</main>
            </div>
          </Providers>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
