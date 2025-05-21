import type { Metadata } from 'next'

import HomePage from '@/components/main'

import { allPosts } from '.contentlayer/generated'

export const metadata: Metadata = {
  title: 'Frontend - 기술 블로그',
  description: 'Front End Study Blog. Focus on React, Javascript, Typescript, and more!',
  authors: [{ name: 'Sang won', url: 'https://wonlee1205-blog.vercel.app/' }],
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
    description: 'Front End Study Blog. Focus on React, Javascript, Typescript, and more!',
    title: 'Frontend - 기술 블로그',
    images: 'https://i.postimg.cc/mgkyBV1w/98155-E51-B8-D6-43-C6-8058-CC3795181-FC1-1-105-c.jpg'
  },
  metadataBase: new URL('https://wonlee1205-blog.vercel.app/'),
  robots: {
    index: true,
    follow: true
  }
}

export default async function Home() {
  return (
    <section className='size-full'>
      <div className='mx-auto flex h-full max-w-5xl items-center justify-center'>
        <HomePage allPostsData={allPosts} />
      </div>
    </section>
  )
}
