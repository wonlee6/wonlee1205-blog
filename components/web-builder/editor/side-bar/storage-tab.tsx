'use client'

import {
  addToast,
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  PressEvent,
  useDisclosure
} from '@heroui/react'
import { Ban, Plus, Trash2Icon, UploadCloud } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useEditorStore } from '@/providers/user-store-provider'
import errorImg from '@/public/images/nope-not-here.webp'

export default function StorageTab({ active }: { active: boolean }) {
  const [uploadedImages, storageUrl, onUploadImage, onDeleteImage] = useEditorStore(
    useShallow((state) => [
      state.uploadImages,
      state.storageUrl,
      state.onUploadImage,
      state.onDeleteImage
    ])
  )

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [files, setFiles] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [modalImg, setModalImg] = useState({
    src: '',
    title: ''
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      if (e.target.files[0].name.includes(' ')) {
        addToast({
          title: 'File name cannot contain spaces',
          color: 'danger'
        })
        return
      } else if (e.target.files[0].name.length > 20) {
        addToast({
          title: 'File name cannot be longer than 20 characters',
          color: 'danger'
        })
        return
      }
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
  const handleUpload = async (e: PressEvent) => {
    if (!files) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', files)
    const response = await fetch('/api/web-builder/storage', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      onUploadImage([...uploadedImages, { path: files.name }])
      setFiles(undefined)
      setPreviewImage(undefined)
    } else {
      addToast({
        title: response.statusText,
        color: 'danger'
      })
    }
    setIsLoading(false)
  }

  const handleSetModalImg = (img: string) => {
    setModalImg({
      src: img,
      title: files!.name
    })
  }

  const handleDeleteImage = async (e: React.MouseEvent<HTMLDivElement>, path: string) => {
    e.preventDefault()
    e.stopPropagation()

    const confirmDelete = confirm('Are you sure you want to delete this image?')
    if (!confirmDelete) return

    const response = await fetch('/api/web-builder/storage', {
      method: 'DELETE',
      body: JSON.stringify({ path })
    })

    if (response.ok) {
      onDeleteImage(path)
      addToast({
        title: response.statusText,
        color: 'primary'
      })
    }
  }

  return (
    <>
      <div className={`flex flex-col gap-3 ${active ? '' : 'hidden'}`}>
        <div className='grid grid-cols-3 gap-1'>
          <label htmlFor='file-choose' className='text-sm'>
            <div className='flex h-8 w-min cursor-pointer items-center gap-1 overflow-hidden rounded-md bg-primary-400 px-2 text-white transition-all hover:bg-primary-300'>
              <Plus size={20} />
              Choose
            </div>
          </label>

          <Button
            onPress={handleUpload}
            isDisabled={!files}
            color='primary'
            radius='sm'
            size='sm'
            startContent={<UploadCloud size={20} />}>
            Upload
          </Button>

          <Button
            onPress={() => {
              setFiles(undefined)
              setPreviewImage(undefined)
            }}
            isDisabled={!files}
            color='danger'
            radius='sm'
            size='sm'
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
              handleSetModalImg(previewImage as string)
              onOpen()
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
        <span className='pl-1 text-foreground-600'>Upload Images List</span>
        <div className='flex flex-col gap-1 overflow-y-auto p-2'>
          {uploadedImages.map((item, index) => {
            return (
              <div
                className='group flex min-h-[70px] items-center gap-2 rounded-md bg-white shadow-md'
                onClick={() => {
                  setModalImg({ src: `${storageUrl}/${item.path}`, title: item.path })
                  onOpen()
                }}
                tabIndex={0}
                role='button'
                aria-hidden
                // eslint-disable-next-line react-x/no-array-index-key
                key={`${storageUrl}/${item.path}-${index}`}>
                <div className='w-5/12 p-1'>
                  <Image
                    src={`${storageUrl}/${item.path}`}
                    alt={item.path}
                    width={100}
                    fallbackSrc={errorImg.src}
                    isBlurred
                    radius='sm'
                    className='transition-all hover:scale-105'
                    classNames={{ wrapper: 'cursor-pointer size-full' }}
                    // isLoading={isFetchLoading}
                  />
                </div>

                <div className='flex w-7/12 flex-col items-center justify-between gap-2'>
                  <span className='w-full truncate text-center text-xs' title={item.path}>
                    {item.path}
                  </span>
                  <div
                    className='group flex items-center gap-1'
                    onClick={(e) => handleDeleteImage(e, item.path)}
                    role='button'
                    onKeyDown={() => {}}
                    tabIndex={0}>
                    <span className='text-xs text-foreground-400 group-hover:text-danger-400'>
                      Delete
                    </span>
                    <Trash2Icon
                      className='text-foreground-400 group-hover:text-danger-400'
                      size={15}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        className='h-[80vh] w-[80vw]'
        onOpenChange={onOpenChange}
        backdrop='blur'>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>{modalImg.title}</ModalHeader>
              <ModalBody>
                <Image
                  src={modalImg.src}
                  alt={modalImg.title}
                  radius='sm'
                  onError={() => setPreviewImage(errorImg.src)}
                  className='size-full'
                  removeWrapper
                  classNames={{ wrapper: 'size-full' }}
                />
                <ModalBody></ModalBody>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
