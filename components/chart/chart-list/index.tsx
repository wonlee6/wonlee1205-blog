'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { ChartHelper } from '@/helper/chart.Helper'
import { ChartType } from '@/types/chart-type'

export default function ChartList({ selectedMenu }: { selectedMenu: ChartType }) {
  const filteredChartImages = useMemo(() => {
    return ChartHelper.getChartList(selectedMenu)
  }, [selectedMenu])

  return (
    <div className='mx-auto w-5/6 pl-8 max-lg:w-full'>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3'>
        {filteredChartImages.map(({ title, url }) => (
          <React.Fragment key={title}>
            <div className='flex flex-col rounded-sm pb-2'>
              <div className='relative p-2 transition-all duration-300 hover:scale-110 hover:shadow-md'>
                <Link
                  href={`/chart/${selectedMenu}/${url.split('images/')[1].replace(/\.(.*)/, '')}`}
                  target='_blank'>
                  <Image
                    className='cursor-pointer'
                    src={url}
                    alt={title}
                    width={800}
                    height={800}
                    priority
                    unoptimized
                  />
                </Link>
              </div>
              <p className='mt-2 cursor-default p-1 text-center font-semibold text-teal-500 hover:text-teal-600'>
                {title}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
