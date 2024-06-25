export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='mx-auto flex max-w-7xl justify-center py-10 max-xl:pl-4 max-lg:w-full'>
      {children}
    </section>
  )
}
