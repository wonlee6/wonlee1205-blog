'use client'

import React, { useRef } from 'react'
import { Trash } from 'lucide-react'
import { useEditorStore } from '@/providers/user-store-provider'
import { EditorElement, ElementType, RecursiveComponent } from '@/model/web-builder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ButtonElement(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { selectedElement, onSelectElement, onDeleteElement, onDragItemOrder } = useEditorStore(
    (state) => state
  )

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

  return (
    <div className='relative w-min'>
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
          onClick={handleDeleteElement}
          className='absolute -top-6 right-0 flex cursor-pointer gap-1 rounded-none rounded-t-lg'
          variant='destructive'>
          Delete
          <Trash size={16} />
        </Badge>
      )}
    </div>
  )
}
