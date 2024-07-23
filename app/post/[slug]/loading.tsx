'use client'

import React from 'react'
import {Spinner} from '@nextui-org/react'

export default function PostLoading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Spinner color='secondary' labelColor='secondary' size='lg' />
    </div>
  )
}
