export default function AninmateLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <section className='flex flex-1'>{children}</section>
}
