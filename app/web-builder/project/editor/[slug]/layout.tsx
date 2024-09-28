import { UserStoreProvider } from '@/providers/user-store-provider'

export default function EditorLayout({
  children // will be a page or nested layout
}: Readonly<{
  children: React.ReactNode
}>) {
  return <UserStoreProvider>{children}</UserStoreProvider>
}
