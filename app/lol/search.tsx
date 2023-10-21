'use client'

import {Input} from '@nextui-org/react'
import {useState, memo} from 'react'

const LoLSearch = () => {
  const [searchName, setSearchName] = useState('')
  return (
    <div className='flex justify-center items-center h-1/6'>
      <div className='w-96'>
        <Input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder='소환사를 입력해주세요'
        />
      </div>
    </div>
  )
}

export default memo(LoLSearch)
