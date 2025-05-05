'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider placement='top-right' />
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        // enableSystem
        // disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
