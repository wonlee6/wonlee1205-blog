'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Post } from '@/app/post/[slug]/page'
import { PostData } from '@/lib/posts'

type PostingGuideModel = {
  postData: Post
  allPostsData: PostData[]
}

export default function PostingGuide({ postData, allPostsData }: PostingGuideModel) {
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
    <div className='flex justify-between gap-8 max-sm:flex-col max-sm:items-center'>
      <Link
        className='font-semibold text-teal-500 hover:text-teal-600'
        href={prevPost ? `/post/${prevPost.id}` : `/`}>
        {prevPost ? `<- Prev: ${prevPost?.title ?? ''}` : '<- Go to Home'}
      </Link>
      {nextPost && (
        <Link
          className='font-semibold text-teal-500 hover:text-teal-600'
          href={`/post/${nextPost.id}`}>
          {`Next: ${nextPost.title ?? ''} ->`}
        </Link>
      )}
    </div>
  )
}
