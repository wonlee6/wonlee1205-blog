'use client'

import React, { useState } from 'react'

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import { cn } from '@/lib/utils'
import ImageErrorImg from '@/public/images/nope-not-here.webp'

type Props = {
  isOpen: boolean
  uploadImages: {
    path: string
  }[]
  storageUrl: string
  onOpenChange: (isOpen: boolean) => void
  onSelectImage: (src: string, alt: string) => void
}

export default function ImageListModal(props: Props) {
  const { isOpen, uploadImages, storageUrl, onOpenChange, onSelectImage } = props

  const [selectedImage, setSelectedImage] = useState({
    url: '',
    path: ''
  })

  if (!isOpen) {
    return null
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shadow='md'
        backdrop='opaque'
        className='max-h-[80vh] overflow-y-auto'
        size='lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Image list (in storage)</ModalHeader>
              <ModalBody>
                {uploadImages.length > 0 ? (
                  uploadImages.map((item, index) => {
                    return (
                      <div
                        className={cn(
                          'flex cursor-pointer items-center gap-4 rounded-md shadow-md hover:bg-default-100',
                          {
                            'bg-primary-50':
                              `${selectedImage.url}/${selectedImage.path}` ===
                              `${storageUrl}/${item.path}`,
                            'hover:bg-primary-100':
                              `${selectedImage.url}/${selectedImage.path}` ===
                              `${storageUrl}/${item.path}`
                          }
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          setSelectedImage({
                            url: storageUrl,
                            path: item.path
                          })
                        }}
                        tabIndex={0}
                        role='button'
                        aria-hidden
                        key={`${storageUrl}/${item.path}-${index}`}>
                        <Image
                          src={`${storageUrl}/${item.path}`}
                          alt={item.path}
                          width={120}
                          fallbackSrc={ImageErrorImg.src}
                          isBlurred
                          radius='sm'
                          loading='eager'
                          className='transition-all hover:scale-105'
                          classNames={{ wrapper: 'm-1 cursor-pointer size-full' }}
                        />
                        <div className='flex size-full flex-col items-center justify-between gap-2'>
                          <span className='truncate text-xs' title={item.path}>
                            {item.path}
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <>Empty Image.</>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='shadow'
                  color='default'
                  onClick={() => {
                    if (!selectedImage.path) {
                      return
                    }
                    onSelectImage(selectedImage.url, selectedImage.path)
                    onClose()
                  }}>
                  Select
                </Button>
                <Button
                  variant='light'
                  color='danger'
                  onClick={() => {
                    onClose()
                    // handleSaveImage()
                  }}>
                  Clear
                </Button>
                {/* {form.backgroundImage && (
                  <Button color='danger' variant='light' onPress={handleImageDelete}>
                    Delete
                  </Button>
                )} */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
