'use client'

import React, { useRef, useState } from 'react'

import { Checkbox, Divider } from '@nextui-org/react'
import { Settings, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function ButtonElement(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    selectedElement,
    onSelectElement,
    onDragItemOrder,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
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

  const [buttonOption, setButtonOption] = useState<{ label: string; url: string }>({
    label: (content as ElementType).innerText ?? '',
    url: ''
  })
  const [isNewTap, setIsNewTap] = useState(false)

  const handleButtonLabelValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        innerText: buttonOption.label,
        ...(buttonOption.url !== '' && { url: buttonOption.url }),
        ...(isNewTap && { isNewTap })
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
    <div className='relative w-min'>
      <Popover modal onOpenChange={handleButtonLabelValue}>
        <PopoverTrigger onClick={(e) => e.stopPropagation()}>
          <Button
            ref={buttonRef}
            onClick={handleClick}
            onFocus={handleFocus}
            style={styles}
            tabIndex={0}
            aria-label={(content as ElementType).innerText}
            draggable
            onDragStart={handleDragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}>
            {(content as ElementType).innerText}
          </Button>
          {selectedElement.id === id && (
            <Badge
              className={cn(
                'absolute left-1 cursor-pointer gap-2 rounded-none bg-primary-500 hover:bg-primary-400',
                isFirstElementInBody
                  ? 'bottom-0 translate-y-full rounded-b-lg'
                  : '-top-5 rounded-t-lg'
              )}
              variant='default'>
              {name}
              <Settings size={15} />
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverContent align='start' sideOffset={0}>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <h4 className='font-medium leading-none'>Button</h4>
            </div>
            <Divider />
            <div className='grid gap-2'>
              <Label htmlFor='button-label'>Label</Label>
              <Input
                id='button-label'
                value={buttonOption.label}
                onChange={(e) => setButtonOption((prev) => ({ ...prev, label: e.target.value }))}
                maxLength={255}
                autoComplete='off'
              />
              <Label htmlFor='button-href'>URL</Label>
              <Input
                id='button-label'
                value={buttonOption.url}
                onChange={(e) => setButtonOption((prev) => ({ ...prev, url: e.target.value }))}
                maxLength={255}
                autoComplete='off'
                placeholder='e.g. http://www.google.com'
              />
              <div className='flex items-center'>
                <Checkbox
                  id='button-tap'
                  size='sm'
                  isSelected={isNewTap}
                  onValueChange={setIsNewTap}>
                  Open in new tap
                </Checkbox>
              </div>
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
    </div>
  )
}
