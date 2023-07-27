import AsideMenu from './asideMenu'

export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='w-3/4 xl:w-8/12 mx-auto pt-20 flex'>
      <div className='w-1/4'>
        <AsideMenu />
      </div>
      <div className='w-3/4 pl-4'>{children}</div>
    </section>
  )
}
