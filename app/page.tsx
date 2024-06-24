import type {Metadata} from 'next'
import {getSortedPostsData} from '@/lib/posts'
import HomePage from '@/components/main'

export const metadata: Metadata = {
  title: '꼬비 집사의 프론트 엔드 관련 기술 블로그',
  description: '프론트 엔드 기술 블로그',
  authors: {name: 'Sangwon', url: 'https://wonlee1205-blog.vercel.app/'},
  keywords: ['react', 'nextjs', 'javascript', 'typescript', 'frontend', '프론트 엔드'],
  creator: 'Sangwon',
  openGraph: {
    type: 'website',
    countryName: 'Korea',
    locale: 'ko',
    url: 'https://wonlee1205-blog.vercel.app/',
    description: '꼬비 집사의 프론트 엔드 관련 기술 블로그',
    title: '꼬비 집사의 프론트 엔드 관련 기술 블로그'
  },
  metadataBase: new URL('https://wonlee1205-blog.vercel.app/')
}

export default async function Home() {
  const allPostsData = await getSortedPostsData()
  return (
    <section className='flex h-full items-center justify-center'>
      <div className='mb-10 h-full max-w-5xl flex-1 p-4'>
        <HomePage allPostsData={allPostsData} />
      </div>
    </section>
  )
}
