export default function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='mx-auto flex size-full max-w-4xl flex-auto flex-col gap-4 max-xl:pl-4 max-lg:w-full'>
      {children}
    </section>
  )
}
