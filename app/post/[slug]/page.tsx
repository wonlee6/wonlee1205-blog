import React, {useMemo} from 'react'
import Link from 'next/link'
import {getAllPostIds, getPostData, getSortedPostsData} from '@/lib/posts'
import Utterance from './utterance'
import MarkdownViwer from './markdownViwer'

export type PostData = {
  date: string
  id: string
  tag: string
  title: string
  contentHtml: string
  description: string
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
    <article>
      {postData.contentHtml && (
        <div className='w-full prose 2xl:prose-lg prose-neutral prose-headings:underline dark:prose-invert dark:prose-blockquote:text-black'>
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
        className='text-teal-500 font-semibold hover:text-teal-600'
        href={prevPost ? `/posts/${prevPost.id}` : `/`}>
        {prevPost ? `<- Prev: ${prevPost?.title ?? ''}` : '<- Go to Home'}
      </Link>
      {nextPost && (
        <Link
          className='text-teal-500 font-semibold hover:text-teal-600'
          href={`/posts/${nextPost.id}`}>
          {`Next: ${nextPost.title ?? ''} ->`}
        </Link>
      )}
    </div>
  )
}
