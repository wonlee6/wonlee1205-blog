import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Poppins } from 'next/font/google'

import HeaderNavBar from '@/components/navigation'

import { Providers } from './provider'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
// const myFont = localFont({ src: 'font/FiraCode-SemiBold.woff2', display: 'swap' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='relative flex h-dvh flex-col overflow-hidden'>
            <HeaderNavBar />
            <main className='flex h-auto grow overflow-y-auto'>{children}</main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
