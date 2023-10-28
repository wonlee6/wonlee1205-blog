import {getSortedPostsData} from '@/lib/posts'
import AsideMenu from '../../../components/post/asideMenu'
import {PostData} from './page'

export default async function PostLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const allPostsData = (await getSortedPostsData()) as PostData[]

  return (
    <section className='max-lg:w-full max-w-7xl max-xl:pl-4 mx-auto flex justify-center py-10'>
      <div className='hidden md:block w-1/4'>
        <AsideMenu allPostsData={allPostsData} />
      </div>
      <div className='w-full pl-4 md:w-3/4'>{children}</div>
    </section>
  )
}
