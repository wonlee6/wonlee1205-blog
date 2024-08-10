export default function ChartsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='h-auto w-full'>{children}</section>
}
