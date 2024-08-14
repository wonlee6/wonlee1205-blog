'use client'

import { Skeleton, Spinner } from '@nextui-org/react'

export default function EditorLoading() {
  return (
    <div className='flex size-full h-auto flex-col'>
      <div className='flex min-h-14 w-full items-center justify-between border-b border-default-300 px-4'>
        <div className='flex h-full w-[200px] space-x-1 p-2'>
          <Skeleton className='h-full w-[50px] rounded-lg' />
          <div className='flex h-full w-[100px] flex-col gap-2'>
            <Skeleton className='h-full rounded-lg' />
            <Skeleton className='h-full rounded-lg' />
          </div>
        </div>
        <div className='flex h-full w-1/12 gap-4 p-2'>
          <Skeleton className='size-full rounded-full' />
          <Skeleton className='size-full rounded-full' />
          <Skeleton className='size-full rounded-full' />
        </div>
        <div className='flex h-full w-1/12 justify-end gap-2 p-2'>
          <Skeleton className='h-full w-10 rounded-full' />
          <Skeleton className='h-full w-20 rounded-lg' />
        </div>
      </div>

      <div className='flex size-full'>
        <section className='relative flex h-full w-4/5 items-center justify-center border-r border-t border-default-300 p-1'>
          <Spinner color='danger' size='lg' />
        </section>

        <aside className='flex h-full w-1/5 flex-col gap-4 border-l border-t border-default-300 p-3'>
          <div className='flex h-10 gap-2'>
            <Skeleton className='w-1/4 rounded-lg' />
            <Skeleton className='w-1/4 rounded-lg' />
            <Skeleton className='w-1/4 rounded-lg' />
            <Skeleton className='w-1/4 rounded-lg' />
          </div>
          <Skeleton className='rounded-lg'>
            <div className='h-60 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-60 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-60 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-60 rounded-lg bg-default-300'></div>
          </Skeleton>
        </aside>
      </div>
    </div>
  )
}
