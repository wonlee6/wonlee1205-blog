'use client'

import { useRef, useState } from 'react'

import { Divider } from '@nextui-org/react'
import { SettingsIcon, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Text(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    onSelectElement,
    onDragItemOrder,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
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

  const [textOption, setTextOption] = useState<{ id: string; maxLength: number }>({
    id: (content as ElementType).id,
    maxLength: (content as ElementType).maxLength
  })

  const handleUpdateTextValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        maxLength: textOption.maxLength,
        ...(textOption.id !== '' && { id: textOption.id })
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
      <Input
        ref={inputRef}
        id={textOption.id ? textOption.id : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-label={(content as ElementType).innerText}
        placeholder={(content as ElementType).innerText}
        className={'relative w-full rounded-sm border-default-300'}
        style={styles}
        tabIndex={0}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        maxLength={textOption.maxLength}
      />
      {!liveMode ? (
        <Popover modal onOpenChange={handleUpdateTextValue}>
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
                <SettingsIcon size={15} />
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
                <Label htmlFor='text-id'>ID</Label>
                <Input
                  id='text-id'
                  value={textOption.id}
                  onChange={(e) => setTextOption((prev) => ({ ...prev, id: e.target.value }))}
                  maxLength={255}
                  autoComplete='off'
                />
                <Label htmlFor='text-maxLength'>Max Length</Label>
                <Input
                  id='text-maxLength'
                  type='number'
                  value={textOption.maxLength}
                  onChange={(e) =>
                    setTextOption((prev) => ({ ...prev, maxLength: +e.target.value }))
                  }
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
