export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='mx-auto my-10 max-w-6xl overflow-auto'>{children}</section>
}
