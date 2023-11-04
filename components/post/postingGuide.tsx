'use client'

import {useMemo} from 'react'
import Link from 'next/link'
import {PostData} from '@/app/post/[slug]/page'
import {useRecoilValue} from 'recoil'
import postsDataAtom from '@/recoil/postsData'

type PostingGuideModel = {
  postData: PostData
}

export default function PostingGuide({postData}: PostingGuideModel) {
  const allPostsData = useRecoilValue(postsDataAtom)

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
    <div className='flex justify-between max-w-[40rem]'>
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
