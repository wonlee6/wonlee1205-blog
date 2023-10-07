import React, {useMemo} from 'react'
import Link from 'next/link'
import {getAllPostIds, getPostData, getSortedPostsData} from '@/lib/posts'
import Utterance from './utterance'
import MarkdownViwer from './markdownViwer'
import {Metadata} from 'next'

export type PostData = {
  date: string
  id: string
  tag: string
  title: string
  contentHtml: string
  description: string
}

export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata> {
  const postData = (await getPostData(params.slug)) as PostData
  return {
    title: postData.title,
    description: postData.description,
    authors: {name: 'Sangwon', url: 'https://wonlee1205-blog.vercel.app/'},
    creator: 'Sangwon',
    keywords: postData.tag,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: postData.description,
      title: postData.title
    },
    metadataBase: new URL('https://wonlee1205-blog.vercel.app/')
  }
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((post) => ({slug: post.params.id}))
}

export default async function Page({
  params
}: {
  params: {slug: string}
}): Promise<JSX.Element> {
  const postData = (await getPostData(params.slug)) as PostData
  const allPostsData = (await getSortedPostsData()) as PostData[]

  return (
    <article className='w-full'>
      {postData.contentHtml && (
        <div className='w-full mb-4 prose 2xl:prose-lg prose-neutral prose-headings:underline dark:prose-invert dark:prose-blockquote:text-black'>
          <MarkdownViwer contentHtml={postData.contentHtml} />
        </div>
      )}
      {/* <Utterance /> */}
      <PostingGuide allPostsData={allPostsData} postData={postData} />
    </article>
  )
}

type PostingGuideModel = {
  allPostsData: PostData[]
  postData: PostData
}

const PostingGuide = ({allPostsData, postData}: PostingGuideModel) => {
  const nextPost = useMemo(() => {
    const findPostIndex = allPostsData.findIndex((v) => v.id === postData?.id)

    if (findPostIndex <= 0) {
      return null
    }

    if (findPostIndex > 0) {
      return allPostsData[findPostIndex - 1]
    }
  }, [allPostsData, postData])

  const prevPost = useMemo(() => {
    const findPostIndex = allPostsData.findIndex((v) => v.id === postData?.id)

    if (findPostIndex === -1 || findPostIndex === allPostsData.length) {
      return null
    }

    if (findPostIndex < allPostsData.length) {
      return allPostsData[findPostIndex + 1]
    }
  }, [allPostsData, postData])

  return (
    <div className='flex justify-between'>
      <Link
        className='text-teal-500 hover:text-teal-600 font-semibold'
        href={prevPost ? `/posts/${prevPost.id}` : `/`}>
        {prevPost ? `<- Prev: ${prevPost?.title ?? ''}` : '<- Go to Home'}
      </Link>
      {nextPost && (
        <Link
          className='font-semibold text-teal-500 hover:text-teal-600'
          href={`/posts/${nextPost.id}`}>
          {`Next: ${nextPost.title ?? ''} ->`}
        </Link>
      )}
    </div>
  )
}
