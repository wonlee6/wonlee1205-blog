// 'use client'

'use client'

import React from 'react'
import {Loading} from '@nextui-org/react'

export default function ChartLoading() {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <Loading size='xl' type='gradient' />
    </div>
  )
}
