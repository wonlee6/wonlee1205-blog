'use client'

import { createClient } from '@/lib/supabase/client'
import { Button, Divider, Image } from '@nextui-org/react'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function StorageTab() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const urlRef = useRef('')

  const [files, setFiles] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>()

  const [uploadedImages, setUploadedImages] = useState<{ path: string }[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0] // 하나만 선택되도록 하기에 0번째 정보를 가져옴
      setFiles(file)

      const reader = new FileReader() // FileReader 함수 이용

      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result)
        }
      }
    }
  }

  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', files!)
    const response = await fetch('/api/web-builder/storage', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const data = await response.json()
      setUploadedImages((prev) => [...prev, { path: data.path }])
    }
  }

  useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await createClient()
        .storage.from('images')
        .list('web-builder', { sortBy: { column: 'name', order: 'asc' } })
      if (data) {
        const filterEmptyData = data
          ?.filter((i) => i.name !== '.emptyFolderPlaceholder')
          .map((i) => ({
            path: i.name
          }))
        setUploadedImages(filterEmptyData)
      }
    }
    fetchImage()
    const url = createClient().storage.from('images').getPublicUrl('web-builder')
    urlRef.current = url.data.publicUrl
  }, [])

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
        </label>

        <Button onClick={handleUpload} isDisabled={!files} color='primary' radius='sm'>
          Upload
        </Button>

        <Button
          onClick={() => {
            setFiles(undefined)
            setPreviewImage(undefined)
          }}
          isDisabled={!files}
          color='danger'
          radius='sm'>
          Cancel
        </Button>
      </div>
      <input
        id='file-choose'
        ref={inputRef}
        className='hidden'
        type='file'
        name='image_uploads'
        accept='.jpg, .jpeg, .png'
        onChange={handleFileChange}
      />
      {previewImage ? (
        <Image
          src={previewImage as string}
          alt={'previewImage'}
          isBlurred
          radius='sm'
          onError={() => {}}
          classNames={{ wrapper: 'm-2 w-full cursor-pointer' }}
        />
      ) : (
        <div className='flex h-[200px] items-center justify-center border border-dashed border-primary-300'>
          <label htmlFor='file-choose' className='cursor-pointer text-foreground-500'>
            Upload
          </label>
        </div>
      )}

      <Divider className='my-2' />
      <span className='text-foreground-600'>Upload Images List</span>
      <div>
        {uploadedImages.map((item) => {
          return <Image key={item.path} src={`${urlRef.current}/${item.path}`} />
        })}
      </div>
    </div>
  )
}
