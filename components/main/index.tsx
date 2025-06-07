'use client'

import { Chip, Pagination } from '@heroui/react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { allPosts } from '@/.contentlayer/generated'
import { getSortedPostsData } from '@/lib/posts'

export default function HomePage() {
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
    const sortedPosts = getSortedPostsData(allPosts)
    if (selectedTag && selectedTag !== 'All') {
      return sortedPosts
        .filter((v) => v.tags.includes(selectedTag))
        .slice(currentPage * 5 - 5, currentPage * 5)
    }
    return sortedPosts.slice(currentPage * 5 - 5, currentPage * 5)
  }, [currentPage, selectedTag])

  const postsLength = useMemo(() => {
    if (selectedTag && selectedTag !== 'All') {
      const filteredTagArr = allPosts.filter((v) => v.tags.includes(selectedTag))
      return Math.ceil(filteredTagArr.length / 5)
    }
    return Math.ceil(allPosts.length / 5)
  }, [selectedTag])

  const filteredTags = useMemo(() => {
    return [...new Set(allPosts.map((acc) => acc.tags).flatMap((item) => item)), 'All']
  }, [])

  useEffect(() => {
    sessionStorage.setItem('lastPage', String(currentPage))
  }, [currentPage])

  return (
    <div className='size-full max-lg:px-10 max-md:px-4'>
      <div className='flex size-full flex-col justify-between'>
        <div className='min-h-0 flex-grow divide-y divide-gray-200 dark:divide-gray-700'>
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
              <li key={item._raw.flattenedPath} className='py-7'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'></dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        {new Date(item.date).toLocaleDateString().replace(/\.$/, '')}
                      </dd>
                    </dl>
                    <div className='space-y-2 xl:col-span-3'>
                      <div className='space-y-4'>
                        <div className='flex flex-col gap-1'>
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            {item.title}
                          </h2>
                          <div className='flex flex-wrap gap-3'>
                            {item.tags.map((v) => (
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
                        <div className='max-w-none text-gray-500 dark:text-gray-400'>
                          {item.description ?? ''}
                        </div>
                      </div>
                      <div className='text-base font-semibold leading-6 text-teal-500 hover:text-teal-600'>
                        <Link href={`/post/${item._raw.flattenedPath}`} prefetch>
                          Read More -{'>'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-center border-t border-gray-200 py-12 dark:border-gray-700'>
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
