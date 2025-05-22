'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { allPosts, Post } from '@/.contentlayer/generated'

type PostingGuideModel = {
  post: Post
}

export default function PostingGuide({ post }: PostingGuideModel) {
  const nextPost = useMemo(() => {
    const findPostIndex = allPosts.findIndex(
      (v) => v._raw.flattenedPath === post?._raw.flattenedPath
    )

    if (findPostIndex <= 0) {
      return null
    }

    if (findPostIndex > 0) {
      return allPosts[findPostIndex - 1]
    }
  }, [post])

  const prevPost = useMemo(() => {
    const findPostIndex = allPosts.findIndex(
      (v) => v._raw.flattenedPath === post?._raw.flattenedPath
    )

    if (findPostIndex === -1 || findPostIndex === allPosts.length) {
      return null
    }

    if (findPostIndex < allPosts.length) {
      return allPosts[findPostIndex + 1]
    }
  }, [post])

  return (
    <div className='flex justify-between gap-8 border-t p-10 max-sm:flex-col max-sm:items-center'>
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
