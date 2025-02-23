'use client'

import { useEffect, useMemo, useState } from 'react'

import { Chip, Pagination } from '@heroui/react'
import Link from 'next/link'

import { PostData } from '@/lib/posts'

type Props = {
  allPostsData: PostData[]
}

export default function HomePage({ allPostsData }: Props) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(sessionStorage.getItem('lastPage')) || 1
    }
    return 1
  })
  const [selectedTag, setSelectedTag] = useState<string>()

  const handlePagination = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }

  const filteredPostsData = useMemo(() => {
    if (selectedTag && selectedTag !== 'All') {
      return allPostsData
        .filter((v) => v.tag.includes(selectedTag))
        .slice(currentPage * 10 - 10, currentPage * 10)
    }
    return allPostsData.slice(currentPage * 10 - 10, currentPage * 10)
  }, [allPostsData, currentPage, selectedTag])

  const postsLength = useMemo(() => {
    if (selectedTag && selectedTag !== 'All') {
      const filteredTagArr = allPostsData.filter((v) => v.tag.includes(selectedTag))
      return Math.ceil(filteredTagArr.length / 10)
    }
    return Math.ceil(allPostsData.length / 10)
  }, [allPostsData, selectedTag])

  const filteredTags = useMemo(() => {
    return [...new Set(allPostsData.map((acc) => acc.tag).flatMap((item) => item))]
  }, [allPostsData])

  useEffect(() => {
    sessionStorage.setItem('lastPage', String(currentPage))
  }, [currentPage])

  return (
    <div className='mt-4 size-full max-lg:px-4'>
      <div className='size-full divide-y divide-gray-200 pb-12 dark:divide-gray-700'>
        <div className='flex w-full justify-between pb-8 pt-6 max-md:flex-col max-md:gap-4'>
          <div className='flex w-1/5 items-center'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-4'>
              Latest
            </h1>
          </div>

          <div className='flex w-3/5 flex-wrap gap-2'>
            {filteredTags.map((item) => (
              <Chip
                key={item}
                className='cursor-pointer'
                onClick={() => handleSelectTag(item)}
                size='sm'
                color={selectedTag === item ? 'warning' : 'default'}
                variant='flat'>
                {item}
              </Chip>
            ))}
          </div>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {filteredPostsData.map((item) => (
            <li key={item.id} className='py-12'>
              <article>
                <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'></dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      {item.date}
                    </dd>
                  </dl>
                  <div className='space-y-5 xl:col-span-3'>
                    <div className='space-y-6'>
                      <div className='flex flex-col gap-1'>
                        <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                          {item.title}
                        </h2>
                        <div className='flex flex-wrap gap-3'>
                          {item.tag.map((v) => (
                            <Chip
                              key={v}
                              onClick={() => handleSelectTag(v)}
                              className='cursor-pointer'
                              color='warning'
                              variant='flat'
                              size='sm'>
                              {v}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                        {item.description ?? ''}
                      </div>
                    </div>
                    <div className='text-base font-semibold leading-6 text-teal-500 hover:text-teal-600'>
                      <Link href={`/post/${item.id}`} prefetch>
                        Read More -{'>'}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className='flex justify-center pt-12'>
          <Pagination
            total={postsLength}
            initialPage={currentPage}
            onChange={handlePagination}
            page={currentPage}
            showControls
          />
        </div>
      </div>
    </div>
  )
}
