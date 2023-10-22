'use client'

import React from 'react'
import {Spinner} from '@nextui-org/react'

export default function SummonerLoading() {
  return (
    <div className='w-screen h-screen z-50 flex justify-center items-center backdrop-blur-lg'>
      <Spinner size='lg' color='secondary' labelColor='secondary' />
    </div>
  )
}
