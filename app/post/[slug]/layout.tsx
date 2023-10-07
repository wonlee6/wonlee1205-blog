import {getSortedPostsData} from '@/lib/posts'
import AsideMenu from './asideMenu'
import {PostData} from './page'

export default async function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const allPostsData = (await getSortedPostsData()) as PostData[]

  return (
    <section className='max-lg:w-full max-lg:px-4 mx-auto pt-10 flex pl-4'>
      <div className='w-1/4'>
        <AsideMenu allPostsData={allPostsData} />
      </div>
      <div className='w-3/4 pl-4'>{children}</div>
    </section>
  )
}
