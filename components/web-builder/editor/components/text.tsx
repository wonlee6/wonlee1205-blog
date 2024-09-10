'use client'

import { useRef } from 'react'

import { TrashIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Text(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { selectedElement, onSelectElement, onDragItemOrder, onDeleteElement } = useEditorStore(
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

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div className='relative w-full'>
      {selectedElement.id === id && (
        <Badge
          className={cn(
            'absolute left-0 cursor-pointer gap-2 rounded-none bg-primary-500 hover:bg-primary-400',
            isFirstElementInBody ? 'bottom-0 translate-y-full' : '-top-6 rounded-t-lg'
          )}
          variant='default'
          onClick={(e) => e.stopPropagation()}>
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
          className={cn(
            'absolute right-0 z-20 flex cursor-pointer gap-1 rounded-none',
            isFirstElementInBody ? 'bottom-0 translate-y-full' : '-top-6 rounded-t-lg'
          )}
          variant='destructive'
          aria-label='Delete Element'>
          Delete
          <TrashIcon size={16} />
        </Badge>
      )}
    </div>
  )
}
