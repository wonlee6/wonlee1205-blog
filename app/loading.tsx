'use client'

import { Spinner } from '@heroui/react'

export default function Loading() {
  return (
    <div className='flex flex-wrap items-end gap-8'>
      <Spinner classNames={{ label: 'text-foreground mt-4' }} label='wave' variant='wave' />
    </div>
  )
}
