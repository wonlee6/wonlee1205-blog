'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Divider, Input, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'

import ImageListModal from '../../common/image-list-modal'
// import SettingPopover from '../setting-popover'
import SettingPopover2 from '../setting-popover2'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'
import ImageErrorImg from '@/public/images/nope-not-here.webp'

export default function ImageElement(props: RecursiveComponent<'Image'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    uploadImages,
    storageUrl,
    onSelectElement,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const URLRef = useRef<HTMLInputElement | null>(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [imageOption, setImageOption] = useState({
    src: content.src,
    alt: content.alt,
    // radio: content.ratio,
    width: content.width,
    height: content.height
  })
  const [showEdit, setShowEdit] = useState(true)

  const handleClick = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    if (liveMode) return

    e.stopPropagation()

    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }
  useEffect(() => console.log('imageOption', imageOption), [imageOption])

  const handleSelectImage = (src: string, alt: string) => {
    if (!src) {
      return
    }
    // onUpdateContentInElement({ src:  })
    setShowEdit(false)
    setImageOption((prev) => ({ ...prev, src, alt }))
  }

  const handleSaveImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageOption.src) {
      URLRef.current?.focus()
      return
    }
    setShowEdit(false)
    // onUpdateContentInElement({ url })
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDeleteElement(id)
  }

  const [isError, setIsError] = useState(false)

  const handleButtonLabelValue = (open: boolean) => {
    if (!open) {
      // onUpdateContentInElement({
      //   innerText: buttonOption.label,
      //   ...(buttonOption.url !== '' && { url: buttonOption.url }),
      //   ...(isNewTap && { isNewTap })
      // })
    }
  }

  const handleDeleteElementByKeyboard = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onDeleteElement(id)
    }
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div
      className={cn(
        'relative',
        liveMode ? 'p-0' : 'min-h-[250px] cursor-pointer rounded-sm border p-1',
        {
          'border-dashed': selectedElement.id === id,
          'border-primary-500 outline-none': selectedElement.id === id
        }
      )}
      onClick={handleClick}
      role='img'
      onKeyDown={() => {}}>
      <Image
        // src={`${imageOption.src}/${imageOption.alt}`}
        src={ImageErrorImg.src}
        alt={imageOption.alt}
        width={imageOption.width}
        height={imageOption.height}
        loading='lazy'
        // fallbackSrc={ImageErrorImg.src}
        style={styles}
      />
      {!liveMode ? (
        <SettingPopover2 onOpenChange={handleButtonLabelValue}>
          <SettingPopover2.Trigger
            isShowBadge={selectedElement.id === id && !liveMode}
            name='Image'
            isFirstElementInBody={isFirstElementInBody}
          />
          <SettingPopover2.Content
            title='Image'
            onDeleteElement={handleDeleteElement}
            onDeleteElementByKeyboard={handleDeleteElementByKeyboard}>
            <Button onClick={onOpen}>Select Image</Button>
            <div className='flex gap-3'>
              <Input
                // value={labelOption.text}
                // onChange={(e) => setLabelOption((prev) => ({ ...prev, text: e.target.value }))}
                type='number'
                label='width'
                radius='sm'
                labelPlacement='outside'
                autoComplete='off'
              />
              <Input
                // value={labelOption.text}
                // onChange={(e) => setLabelOption((prev) => ({ ...prev, text: e.target.value }))}
                type='number'
                radius='sm'
                label='height'
                labelPlacement='outside'
                autoComplete='off'
              />
            </div>
          </SettingPopover2.Content>
        </SettingPopover2>
      ) : null}

      <ImageListModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        storageUrl={storageUrl}
        uploadImages={uploadImages}
        onSelectImage={handleSelectImage}
      />
    </div>
  )
}
