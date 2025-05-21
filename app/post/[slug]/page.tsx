import { Metadata } from 'next'

import MDXComponent from '@/components/post/mdx-component'

import PostingGuide from '../../../components/post/postingGuide'
import { allPosts } from '.contentlayer/generated'

// import Utterance from '@/components/post/utterance'

export type Post = {
  date: string
  id: string
  tag: string[]
  title: string
  contentHtml: string
  description: string
}

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
    authors: [{ name: 'sang won', url: `https://wonlee1205-blog.vercel.app/post/${id}` }],
    creator: 'sang won',
    // keywords: postData.tag,
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
    // notFound()
    return <div>Post not found</div>
  }

  return (
    <>
      <div className='flex flex-col justify-between p-4 pb-20'>
        <MDXComponent code={post.body.code} />
        {/* <Utterance /> */}
        {/* <PostingGuide allPostsData={allPostsData} postData={postData} /> */}
      </div>
    </>
  )
}
