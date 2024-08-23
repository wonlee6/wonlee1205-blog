'use client'

import { createClient } from '@/lib/supabase/client'
import { Button, Image } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function StorageTab() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [files, setFiles] = useState<FileList>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    setFiles(e.target.files)
  }

  const handleUpload = async (e: React.MouseEvent) => {
    if (!files) return
    e.preventDefault()
    // const url = supabase.storage.from('images').getPublicUrl('work')

    // const { data, error } = await supabase.storage
    //   .from('images')
    //   .list('work', { sortBy: { column: 'name', order: 'asc' } })

    const avatarFile = files[0]
    console.log(avatarFile)

    const { data, error } = await createClient()
      .storage.from('images')
      .upload('web-builder/avatar1.png', avatarFile)

    console.log(data, error)
  }

  useEffect(() => console.log(files), [files])

  return (
    <div className='flex flex-col gap-3'>
      {/* <div className='relative w-min cursor-pointer overflow-hidden bg-primary-500 text-white'>
        <span className='p-5'>Choose</span>
        <input className='hidden' type='file' name='image_uploads' accept='.jpg, .jpeg, .png' />
      </div> */}

      <div className='flex flex-wrap gap-3'>
        <label htmlFor='file-choose'>
          <div className='flex w-min cursor-pointer items-center gap-2 overflow-hidden rounded-md bg-primary-400 p-2 text-white transition-all hover:bg-primary-300'>
            <Plus />
            Choose
          </div>

          <input
            id='file-choose'
            ref={inputRef}
            className='hidden'
            type='file'
            name='image_uploads'
            accept='.jpg, .jpeg, .png'
            multiple
            onChange={handleFileChange}
          />
        </label>

        <Button onClick={handleUpload} color='primary' radius='sm'>
          Upload
        </Button>

        <label htmlFor='file-cancel'>
          <div className='flex w-min cursor-pointer items-center gap-2 overflow-hidden rounded-md bg-primary-400 p-2 text-white transition-all hover:bg-primary-300'>
            <Plus />
            Cancel
          </div>
        </label>
      </div>
      {/* {files.map((i) => (
        <Image key={i} src={i} alt={i} />
      ))} */}
    </div>
  )
}
