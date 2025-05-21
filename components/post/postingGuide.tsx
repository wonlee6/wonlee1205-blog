'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { Post } from '@/.contentlayer/generated'

type PostingGuideModel = {
  postData: Post
  allPostsData: Post[]
}

export default function PostingGuide({ postData, allPostsData }: PostingGuideModel) {
  const nextPost = useMemo(() => {
    const findPostIndex = allPostsData.findIndex(
      (v) => v._raw.flattenedPath === postData?._raw.flattenedPath
    )

    if (findPostIndex <= 0) {
      return null
    }

    if (findPostIndex > 0) {
      return allPostsData[findPostIndex - 1]
    }
  }, [allPostsData, postData])

  const prevPost = useMemo(() => {
    const findPostIndex = allPostsData.findIndex(
      (v) => v._raw.flattenedPath === postData?._raw.flattenedPath
    )

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
        href={prevPost ? `/post/${prevPost._raw.flattenedPath}` : `/`}>
        {prevPost ? `<- Prev: ${prevPost?.title ?? ''}` : '<- Go to Home'}
      </Link>
      {nextPost && (
        <Link
          className='font-semibold text-teal-500 hover:text-teal-600'
          href={`/post/${nextPost._raw.flattenedPath}`}>
          {`Next: ${nextPost.title ?? ''} ->`}
        </Link>
      )}
    </div>
  )
}
