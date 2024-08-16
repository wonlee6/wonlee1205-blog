export default function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='mx-auto size-full max-w-4xl flex-auto max-xl:pl-4 max-lg:w-full'>
      {children}
    </section>
  )
}
