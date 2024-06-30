'use client'

import React from 'react'
import {Spinner} from '@nextui-org/react'

export default function PostLoading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Spinner size='lg' color='secondary' labelColor='secondary' />
    </div>
  )
}
