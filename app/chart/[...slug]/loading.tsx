'use client'

import React from 'react'
import {Spinner} from '@nextui-org/react'

export default function ChartLoading() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner size='lg' />
    </div>
  )
}
