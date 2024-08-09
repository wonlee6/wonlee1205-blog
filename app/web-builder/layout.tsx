import { UserStoreProvider } from '@/providers/user-store-provider'

export default function WebBuilderRootLayout({
  children // will be a page or nested layout
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='m-auto flex size-full items-center justify-center p-4'>
      <UserStoreProvider>{children}</UserStoreProvider>
    </div>
  )
}
