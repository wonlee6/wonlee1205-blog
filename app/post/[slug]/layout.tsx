export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='mx-auto my-4 max-w-4xl overflow-auto'>{children}</section>
}
6
