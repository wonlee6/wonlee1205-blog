import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MDXComponent from '@/components/post/mdx-component'
import PostingGuide from '@/components/post/postingGuide'
import Toc from '@/components/post/toc'

import { allPosts } from '.contentlayer/generated'

// import Utterance from '@/components/post/utterance'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const id = (await params).slug
  const postData = allPosts.find((post) => post._raw.flattenedPath === id)

  if (!postData) {
    return {}
  }

  return {
    title: postData.title,
    description: postData.description,
    authors: [{ name: 'sangwon', url: `https://wonlee1205-blog.vercel.app/post/${id}` }],
    creator: 'sangwon',
    keywords: postData.tags,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: postData.description,
      title: postData.title,
      url: `https://wonlee1205-blog.vercel.app/post/${id}`
    },
    metadataBase: new URL(`https://wonlee1205-blog.vercel.app/post/${id}`)
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className='flex gap-16 py-4'>
      <div className='flex w-9/12 flex-col gap-4'>
        <article className='size-full'>
          <MDXComponent code={post.body.code} />
        </article>
        <PostingGuide post={post} />
      </div>
      <div className='relative w-3/12'>
        <Toc headings={post.headings} />
      </div>
      {/* <Utterance /> */}
    </div>
  )
}
