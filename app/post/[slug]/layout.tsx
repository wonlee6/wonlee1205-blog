import AsideMenu from '@/components/post/asideMenu'

export default function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='max-lg:w-full max-w-7xl max-xl:pl-4 mx-auto flex justify-center py-10'>
      <div className='hidden md:block w-1/4'>
        <AsideMenu />
      </div>
      <div className='w-full pl-4 md:w-3/4'>{children}</div>
    </section>
  )
}
