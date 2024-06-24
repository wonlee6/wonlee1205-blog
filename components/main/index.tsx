'use client'

import {useMemo, useState} from 'react'
import Link from 'next/link'
import {Pagination} from '@nextui-org/react'
import {PostData} from '@/lib/posts'

type Props = {
  allPostsData: PostData[]
}

export default function HomePage({allPostsData}: Props) {
  const postsLength = Math.ceil(allPostsData.length / 10)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePagination = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const filteredPostsData = useMemo(() => {
    return [...allPostsData].slice(currentPage * 10 - 10, currentPage * 10)
  }, [allPostsData, currentPage])

  return (
    <div className='mx-auto my-0 h-full w-full max-w-7xl py-10 pl-4 max-lg:w-full max-lg:px-4'>
      <div className='mb-auto h-full w-full divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-100'>
            Latest
          </h1>
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
                      <div>
                        <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                          {item.title}
                        </h2>
                        <div className='flex flex-wrap'>{item.tag}</div>
                      </div>
                      <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                        {item.description ?? ''}
                      </div>
                    </div>
                    <div className='text-base font-semibold leading-6 text-teal-500 hover:text-teal-600'>
                      <Link href={`/post/${item.id}`}>Read More -{'>'}</Link>
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
            showControls
          />
        </div>
      </div>
    </div>
  )
}
