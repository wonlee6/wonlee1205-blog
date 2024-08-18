import { UserStoreProvider } from '@/providers/user-store-provider'

export default function WebBuilderRootLayout({
  children // will be a page or nested layout
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <UserStoreProvider>{children}</UserStoreProvider>
    </>
  )
}
