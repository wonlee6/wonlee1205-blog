'use client'

import React, { useState } from 'react'

import { Divider } from '@nextui-org/react'
import { Settings, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function LabelElement(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    onSelectElement,
    onDragItemOrder,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLLabelElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
  }

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete') {
      e.preventDefault()
      e.stopPropagation()
      onDeleteElement(id)
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation()

    const sourceIndex = e.dataTransfer.getData('text')
    const destinationIndex = index
    onDragItemOrder(parentId, Number(sourceIndex), Number(destinationIndex))
  }

  const [labelOption, setLabelOption] = useState<{ text: string; id: string }>({
    text: (content as ElementType).innerText ?? '',
    id: (content as ElementType).id ?? ''
  })

  const handleUpdateLabelValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        innerText: labelOption.text,
        ...(labelOption.id !== '' && { id: labelOption.id })
      })
    }
  }

  const handleDeleteElementByKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onDeleteElement(id)
    }
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div className='relative w-full'>
      <Label
        htmlFor={liveMode && labelOption.id ? labelOption.id : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        className={liveMode ? '' : 'border'}
        style={styles}
        tabIndex={0}
        aria-label={(content as ElementType).innerText}
        draggable
        onDragStart={handleDragStart}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onKeyDown={handleDeleteKeyDown}>
        {(content as ElementType).innerText}
      </Label>
      {!liveMode ? (
        <Popover modal onOpenChange={handleUpdateLabelValue}>
          <PopoverTrigger
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'absolute left-0 z-10',
              isFirstElementInBody ? 'bottom-0' : '-top-6 left-0'
            )}>
            {selectedElement.id === id && (
              <Badge
                className={cn(
                  'cursor-pointer gap-2 rounded-none bg-primary-500 hover:bg-primary-400',
                  isFirstElementInBody ? 'translate-y-full rounded-b-lg' : 'rounded-t-lg'
                )}
                variant='default'>
                {name}
                <Settings size={15} />
              </Badge>
            )}
          </PopoverTrigger>
          <PopoverContent align='start' sideOffset={0} onClick={(e) => e.stopPropagation()}>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Label Setting</h4>
              </div>
              <Divider />
              <div className='grid gap-2'>
                <Label htmlFor='label-text'>Text</Label>
                <Input
                  id='label-text'
                  value={labelOption.text}
                  onChange={(e) => setLabelOption((prev) => ({ ...prev, text: e.target.value }))}
                  maxLength={255}
                  autoComplete='off'
                />
                <Label htmlFor='label-id'>ID</Label>
                <Input
                  id='label-id'
                  value={labelOption.id}
                  onChange={(e) => setLabelOption((prev) => ({ ...prev, id: e.target.value }))}
                  maxLength={255}
                  autoComplete='off'
                />
                <Divider />
                <div
                  onClick={handleDeleteElement}
                  aria-label='Delete Button'
                  onKeyDown={handleDeleteElementByKeyboard}
                  role='button'
                  tabIndex={0}
                  className='flex cursor-pointer items-center gap-2 rounded-md p-1 text-danger-500 transition-all hover:bg-danger-500 hover:text-white'>
                  <Trash2Icon size={15} />
                  <span>Delete Button</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )
}
