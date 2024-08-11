'use client'

import { Spinner } from '@nextui-org/spinner'

export default function LoadingSpinner() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner size='lg' />
    </div>
  )
}
