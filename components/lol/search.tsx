'use client'

import {Input} from '@nextui-org/react'
import {useRouter} from 'next/navigation'
import {useState, memo} from 'react'

const LoLSearch = () => {
  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  return (
    <div className='flex justify-center items-center h-1/6'>
      <div className='w-96'>
        <Input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              router.push(`/lol/${searchName}`)
            }
          }}
          placeholder='소환사 검색'
        />
      </div>
    </div>
  )
}

export default memo(LoLSearch)
