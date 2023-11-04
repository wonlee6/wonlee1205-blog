'use client'

import Image from 'next/image'
import React from 'react'

interface ChartListItemModel {
  url: string
  title: string
  onChartClick: (title: number, url: string) => void
  index: number
}

export default function ChartListItem({
  url,
  title,
  onChartClick,
  index
}: ChartListItemModel) {
  return (
    <div className='flex flex-col pb-2 rounded-sm'>
      <div className='relative p-2 hover:scale-110 duration-300 transition-all'>
        <Image
          className='cursor-pointer'
          src={url}
          alt={title}
          width={800}
          height={800}
          onClick={() => onChartClick(index, url)}
          priority={true}
        />
      </div>
      <p className='mt-2 p-1 text-center dark:text-teal-500'>{title}</p>
    </div>
  )
}
