'use client'

import { Checkbox, Image, Input, Select, SelectItem, Tooltip, useDisclosure } from '@heroui/react'
import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/providers/user-store-provider'
import ImageErrorImg from '@/public/images/nope-not-here.webp'
import { RecursiveComponent } from '@/types/web-builder'

import ImageListModal from '../../common/image-list-modal'
import SettingPopover2 from '../setting-popover2'

export default function ImageElement(props: RecursiveComponent<'Image'>) {
  const { content, name, id, styles, group, customStyles, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    uploadImages,
    storageUrl,
    onSelectElement,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleClick = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    if (liveMode) return

    e.stopPropagation()

    onSelectElement({
      id,
      name,
      group,
      styles,
      content,
      customStyles
    })
  }

  const handleSelectImage = (src: string, alt: string) => {
    if (!src || !alt) {
      return
    }
    onUpdateContentInElement({ ...content, src, alt })
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDeleteElement(id)
  }

  const handleDeleteElementByKeyboard = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      onDeleteElement(id)
    }
  }

  const [triggerKey, setTriggerKey] = useState(0)

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTriggerKey((prev) => prev + 1)
    onUpdateContentInElement({ ...content, [e.target.name]: +e.target.value })
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateContentInElement({ ...content, [e.target.name]: e.target.value })
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  const divRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={divRef}
      className={cn(
        'relative inline-flex w-max',
        liveMode
          ? 'p-0'
          : 'cursor-pointer rounded-sm border p-1 hover:ring-1 hover:ring-primary-200',
        {
          'border-dashed': selectedElement.id === id && !liveMode,
          'border-primary-500 outline-none': selectedElement.id === id && !liveMode
        }
      )}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Delete') {
          e.preventDefault()
          e.stopPropagation()
          onDeleteElement(id)
        }
      }}>
      <Image
        key={String(triggerKey)}
        src={content.src ? `${content.src}/${content.alt}` : ImageErrorImg.src}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading='eager'
        isBlurred={content.blur}
        isZoomed={content.zoom}
        shadow={content.shadow}
        radius={content.radius}
        isLoading={!content.src}
        style={styles}
        draggable
        onDragStart={onDragStartInElement}
        onDrop={onDropInElement}
        onDragOver={(e) => e.preventDefault()}
      />
      {!liveMode ? (
        <SettingPopover2 element={divRef.current!}>
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
                name='width'
                value={String(content.width)}
                onChange={handleChangeInputValue}
                label='width'
                radius='sm'
                labelPlacement='outside'
                placeholder='e.g. 300'
                autoComplete='off'
              />
              <Input
                name='height'
                value={String(content.height)}
                onChange={handleChangeInputValue}
                radius='sm'
                label='height'
                labelPlacement='outside'
                placeholder='e.g. 300'
                autoComplete='off'
              />
            </div>
            <Select
              name='radius'
              label='Radius'
              variant='bordered'
              placeholder='Select a radius'
              selectedKeys={[content.radius] as Iterable<string | number>}
              className='max-w-xs'
              onChange={handleSelectionChange}>
              {radiusOption.map((radius) => (
                <SelectItem key={radius.value}>{radius.name}</SelectItem>
              ))}
            </Select>
            <Select
              name='shadow'
              label='Shadow'
              variant='bordered'
              placeholder='Select a shadow'
              selectedKeys={[content.shadow] as Iterable<string | number>}
              className='max-w-xs'
              onChange={handleSelectionChange}>
              {shadowOption.map((shadow) => (
                <SelectItem key={shadow.value}>{shadow.name}</SelectItem>
              ))}
            </Select>
            <div className='flex gap-4'>
              <Tooltip
                content='Whether the image should have a duplicated blurred image at the background.'
                placement='bottom-start'>
                <Checkbox
                  isSelected={content.blur}
                  onValueChange={(isSelected) =>
                    onUpdateContentInElement({ ...content, blur: isSelected })
                  }>
                  Blur
                </Checkbox>
              </Tooltip>

              <Tooltip
                content='Whether the image should be zoomed when hovered.'
                placement='bottom-start'>
                <Checkbox
                  isSelected={content.zoom}
                  onValueChange={(isSelected) =>
                    onUpdateContentInElement({ ...content, zoom: isSelected })
                  }>
                  Zoom
                </Checkbox>
              </Tooltip>
            </div>
          </SettingPopover2.Content>
        </SettingPopover2>
      ) : null}

      {isOpen && (
        <ImageListModal
          isOpen={isOpen}
          src={content.src}
          alt={content.alt}
          onOpenChange={onOpenChange}
          storageUrl={storageUrl}
          uploadImages={uploadImages}
          onSelectImage={handleSelectImage}
        />
      )}
    </div>
  )
}

const radiusOption = [
  { name: 'none', value: 'none' },
  { name: 'small', value: 'sm' },
  { name: 'medium', value: 'md' },
  { name: 'large', value: 'lg' },
  { name: 'XLarge', value: 'xl' },
  { name: 'full', value: 'full' }
]

const shadowOption = [
  { name: 'none', value: 'none' },
  { name: 'small', value: 'sm' },
  { name: 'medium', value: 'md' },
  { name: 'large', value: 'lg' }
]
