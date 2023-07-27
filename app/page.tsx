import HomePage from './homePage'
import {getSortedPostsData} from '@/lib/posts'

export default async function Home() {
  const allPostsData = await getSortedPostsData()
  return (
    <div className='h-full flex flex-col'>
      <HomePage allPostsData={allPostsData} />
    </div>
  )
}
