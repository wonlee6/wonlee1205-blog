'use client'

import React from 'react'
import {Spinner} from '@nextui-org/react'

export default function LolLoading() {
  return (
    <div className='w-full h-1/2 flex justify-center items-center'>
      <Spinner size='lg' color='secondary' labelColor='secondary' />
    </div>
  )
}
