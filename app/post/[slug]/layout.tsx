import {getSortedPostsData} from '@/lib/posts'
import AsideMenu from './asideMenu'
import {PostData} from './page'

export default async function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const allPostsData = (await getSortedPostsData()) as PostData[]
  console.log()

  return (
    <section className='w-3/4 xl:w-8/12 mx-auto pt-20 flex'>
      <div className='w-1/4'>
        <AsideMenu allPostsData={allPostsData} />
      </div>
      <div className='w-3/4 pl-4'>{children}</div>
    </section>
  )
}
