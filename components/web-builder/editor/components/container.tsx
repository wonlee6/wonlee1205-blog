'use client'

import React, { useRef } from 'react'
import { Trash } from 'lucide-react'
import { addElementByType } from '@/lib/editor'
import { ComponentType, EditorElement } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Recursive from '../canvas/recursive'

export default function Container(props: EditorElement) {
  const { id, name, styles, type, content } = props

  const { selectedElement, onAddElement, onSelectElement, onDeleteElement } = useEditorStore(
    (state) => state
  )

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const componentType = e.dataTransfer.getData('text')

    const value = addElementByType(componentType as ComponentType)
    if (typeof value !== 'undefined') {
      onAddElement(id, value)
    }
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
  }

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      type,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleSelectElement()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onDeleteElement(id)
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex={0}
        className={cn('relative border border-default-400 p-2', {
          'border-dashed': selectedElement.id === id,
          'border-primary-500 outline-none': selectedElement.id === id
        })}
        style={styles}>
        {selectedElement.id === id && (
          <Badge
            className='absolute -top-6 left-0 cursor-pointer rounded-none rounded-t-lg bg-primary-500 dark:bg-primary-500'
            variant='default'>
            {name}
          </Badge>
        )}

        {(content as EditorElement[]).map((item) => (
          <Recursive key={item.id} {...item} />
        ))}

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
    </>
  )
}
