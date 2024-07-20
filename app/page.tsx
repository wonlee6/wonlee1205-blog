import type {Metadata} from 'next'
import {getSortedPostsData} from '@/lib/posts'
import HomePage from '@/components/main'

export const metadata: Metadata = {
  title: '꼬비 집사의 프론트 엔드 기술 블로그',
  description: '프론트 엔드 기술 블로그, front-end dev',
  authors: [{name: 'Sangwon', url: 'https://wonlee1205-blog.vercel.app/'}],
  keywords: [
    'react',
    'nextjs',
    'javascript',
    'typescript',
    'frontend',
    'recoil',
    'tailwindcss',
    '프론트 엔드'
  ],
  creator: 'sang won',
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
    <section className='mx-auto flex h-full max-w-5xl items-center justify-center'>
      <HomePage allPostsData={allPostsData} />
    </section>
  )
}
