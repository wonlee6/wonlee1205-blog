export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='mx-auto my-4 size-full max-w-4xl'>{children}</section>
}
6
