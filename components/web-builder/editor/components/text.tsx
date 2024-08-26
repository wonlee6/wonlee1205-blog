'use client'

import { useRef } from 'react'

import { Trash } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Text(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { selectedElement, onSelectElement, onDeleteElement, onDragItemOrder } = useEditorStore(
    (state) => state
  )

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

  return (
    <div className='relative w-full'>
      {selectedElement.id === id && (
        <Badge
          className='absolute -top-6 left-0 cursor-pointer rounded-none rounded-t-lg bg-primary-500 dark:bg-primary-500'
          variant='default'>
          {name}
        </Badge>
      )}

      <Input
        ref={inputRef}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-label={(content as ElementType).innerText}
        placeholder={(content as ElementType).innerText}
        className={'relative w-full rounded-sm border-default-300 dark:border-default-300'}
        style={styles}
        tabIndex={0}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />

      {selectedElement.id === id && (
        <Badge
          onClick={handleDeleteElement}
          className='absolute -top-6 right-0 z-20 flex cursor-pointer gap-1 rounded-none rounded-t-lg'
          variant='destructive'
          aria-label='Delete Element'>
          Delete
          <Trash size={16} />
        </Badge>
      )}
    </div>
  )
}
