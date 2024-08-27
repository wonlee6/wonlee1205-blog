'use client'

import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { Ban, Plus, UploadCloud } from 'lucide-react'

import { useToast } from '@/components/ui/use-toast'
import { getStorageUrl } from '@/lib/session'
import { StorageSchemaModel } from '@/model/web-builder'
import errorImg from '@/public/images/error_img.png'

export default function StorageTab() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const urlRef = useRef('')

  const { toast } = useToast()

  const [files, setFiles] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>()

  const [uploadedImages, setUploadedImages] = useState<{ path: string }[]>([])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [modalImg, setModalImg] = useState<string>()

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
    if (!files) return

    e.preventDefault()
    const formData = new FormData()
    formData.append('file', files!)
    const response = await fetch('/api/web-builder/storage', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      setUploadedImages((prev) => [...prev, { path: files.name }])
      setFiles(undefined)
      setPreviewImage(undefined)
    } else {
      toast({
        variant: 'default',
        title: response.statusText
      })
    }
  }

  const handleSetModalImg = (img: string) => {
    setModalImg(img)
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const fetchImageList = fetch('/api/web-builder/storage', {
          method: 'GET'
        })
        const fetchUrl = getStorageUrl()
        const response = await Promise.allSettled([fetchImageList, fetchUrl])

        if (response[0].status === 'fulfilled') {
          const data: StorageSchemaModel[] = await response[0].value.json()
          const filterEmptyData = data
            .filter((i) => i.name !== '.emptyFolderPlaceholder')
            .map((i) => ({
              path: i.name
            }))
          setUploadedImages(filterEmptyData)
        }
        if (response[1].status === 'fulfilled') {
          urlRef.current = response[1].value
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchImage()
  }, [])

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap gap-3'>
          <label htmlFor='file-choose'>
            <div className='flex w-min cursor-pointer items-center gap-1 overflow-hidden rounded-md bg-primary-400 p-2 text-white transition-all hover:bg-primary-300'>
              <Plus size={20} />
              Choose
            </div>
          </label>

          <Button onClick={handleUpload} isDisabled={!files} color='primary' radius='sm'>
            <UploadCloud size={20} />
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
            <Ban size={20} />
            Cancel
          </Button>
        </div>
        <input
          id='file-choose'
          ref={inputRef}
          className='hidden'
          type='file'
          name='image_uploads'
          accept='.jpg, .jpeg, .png, .webp'
          onChange={handleFileChange}
        />
        {previewImage ? (
          <Image
            src={previewImage as string}
            alt={'previewImage'}
            isBlurred
            radius='sm'
            onError={() => setPreviewImage(errorImg.src)}
            onClick={() => {
              onOpen()
              handleSetModalImg(previewImage as string)
            }}
            classNames={{ wrapper: 'm-2 w-full cursor-pointer' }}
          />
        ) : (
          <div className='flex h-[200px] items-center justify-center gap-2 border border-dashed border-primary-300'>
            <UploadCloud />
            <label htmlFor='file-choose' className='cursor-pointer text-foreground-500'>
              Upload
            </label>
          </div>
        )}

        <Divider className='my-2' />
        <span className='text-foreground-600'>Upload Images List</span>
        <div className='flex flex-col gap-1 overflow-y-auto'>
          {uploadedImages.map((item, index) => {
            return (
              <div
                className='flex cursor-pointer items-center gap-4 rounded-md shadow-md hover:bg-default-100'
                onClick={() => {
                  setModalImg(`${urlRef.current}/${item.path}`)
                  onOpen()
                }}
                tabIndex={0}
                role='button'
                aria-hidden
                key={`${urlRef.current}/${item.path}-${index}`}>
                <Image
                  src={`${urlRef.current}/${item.path}`}
                  alt={item.path}
                  width={60}
                  fallbackSrc={errorImg.src}
                  isBlurred
                  radius='sm'
                  className='transition-all hover:scale-110'
                  classNames={{ wrapper: 'm-2 cursor-pointer' }}
                />
                <span className='truncate' title={item.path}>
                  {item.path}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' backdrop='blur'>
        <ModalContent>
          {() => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <Image
                  src={modalImg}
                  alt={'previewImage'}
                  radius='sm'
                  onError={() => setPreviewImage(errorImg.src)}
                  // className='h-[70vh] w-[70vw]'
                  classNames={{ wrapper: 'm-2' }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
