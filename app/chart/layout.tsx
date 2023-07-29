export default function ChartsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='w-3/4 xl:w-8/12 mx-auto pt-20'>{children}</section>
}
