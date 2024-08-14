export default function WebBuilderRootLayout({
  children // will be a page or nested layout
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='flex h-auto w-full grow'>{children}</div>
}
