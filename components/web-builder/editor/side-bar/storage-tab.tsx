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
import { Ban, Plus, Trash, TrashIcon, UploadCloud } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { useToast } from '@/components/ui/use-toast'
import { getStorageUrl } from '@/lib/session'
import { StorageSchemaModel } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'
import errorImg from '@/public/images/nope-not-here.webp'

export default function StorageTab() {
  const [uploadedImages, onUploadImage, onDeleteImage] = useEditorStore(
    useShallow((state) => [state.uploadImages, state.onUploadImage, state.onDeleteImage])
  )

  const inputRef = useRef<HTMLInputElement | null>(null)
  const urlRef = useRef('')

  const { toast } = useToast()

  const [files, setFiles] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [modalImg, setModalImg] = useState<string>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]
      setFiles(file)

      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result)
        }
      }
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const handleUpload = async (e: React.MouseEvent) => {
    if (!files) return
    e.preventDefault()

    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', files!)
    const response = await fetch('/api/web-builder/storage', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      onUploadImage([...uploadedImages, { path: files.name }])
      setFiles(undefined)
      setPreviewImage(undefined)
    } else {
      toast({
        variant: 'default',
        title: response.statusText
      })
    }
    setIsLoading(false)
  }

  const handleSetModalImg = (img: string) => {
    setModalImg(img)
  }

  const handleDeleteImage = async (e: React.MouseEvent<HTMLOrSVGElement>, path: string) => {
    e.stopPropagation()

    const response = await fetch('/api/web-builder/storage', {
      method: 'DELETE',
      body: JSON.stringify({ path })
    })

    if (response.ok) {
      onDeleteImage(path)
      toast({
        variant: 'default',
        title: response.statusText
      })
    }
  }

  const [isFetchLoading, setIsFetchLoading] = useState(true)
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
          onUploadImage(filterEmptyData)
        }
        if (response[1].status === 'fulfilled') {
          urlRef.current = response[1].value
        }
      } catch (e) {
        console.error(e)
      }
      setIsFetchLoading(false)
    }
    fetchImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <Button
            onClick={handleUpload}
            isDisabled={!files}
            color='primary'
            radius='sm'
            startContent={<UploadCloud size={20} />}>
            Upload
          </Button>

          <Button
            onClick={() => {
              setFiles(undefined)
              setPreviewImage(undefined)
            }}
            isDisabled={!files}
            color='danger'
            radius='sm'
            startContent={<Ban size={20} />}>
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
            isLoading={isLoading}
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
        <div className='flex flex-col gap-1 overflow-y-auto p-2'>
          {uploadedImages.map((item, index) => {
            return (
              <div
                className='flex min-h-[70px] cursor-pointer items-center gap-4 rounded-md shadow-md hover:bg-default-100'
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
                  width={100}
                  fallbackSrc={errorImg.src}
                  isBlurred
                  radius='sm'
                  className='transition-all hover:scale-105'
                  classNames={{ wrapper: 'm-2 cursor-pointer size-full' }}
                  isLoading={isFetchLoading}
                />
                <div className='flex size-full items-center justify-between px-4'>
                  <span className='truncate' title={item.path}>
                    {item.path}
                  </span>
                  <TrashIcon
                    onClick={(e) => handleDeleteImage(e, item.path)}
                    className='hover:text-primary-400'
                    size={20}
                  />
                </div>
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
              <ModalBody className='size-full'>
                <Image
                  src={modalImg}
                  alt={'previewImage'}
                  radius='sm'
                  onError={() => setPreviewImage(errorImg.src)}
                  className='w-[60vw]'
                  classNames={{ wrapper: 'm-2 size-full' }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
