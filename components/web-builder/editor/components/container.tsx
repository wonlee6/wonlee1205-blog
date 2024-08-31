'use client'

import React, { useRef } from 'react'

import { Trash } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import Recursive from '../canvas/recursive'
import { Badge } from '@/components/ui/badge'
import { addElementByType } from '@/helper/editor.helper'
import { cn } from '@/lib/utils'
import { ComponentName, EditorElement, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Container(props: RecursiveComponent) {
  const { id, name, styles, group, content, index, parentId } = props

  const [selectedElement, onAddElement, onSelectElement, onDeleteElement, onDragItemOrder] =
    useEditorStore(
      useShallow((state) => [
        state.selectedElement,
        state.onAddElement,
        state.onSelectElement,
        state.onDeleteElement,
        state.onDragItemOrder
      ])
    )

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const dragItem = e.dataTransfer.getData('text')

    if (isNaN(Number(dragItem))) {
      const value = addElementByType(dragItem as ComponentName)
      if (typeof value !== 'undefined') {
        onAddElement(id, value)
        return
      }
    }
    onDragItemOrder(parentId, Number(dragItem), index)
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    onDeleteElement(id)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()
      onDeleteElement(id)
    }
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      draggable
      onClick={handleClick}
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
          className={cn(
            'absolute left-0 cursor-pointer rounded-none rounded-t-lg bg-primary-500 dark:bg-primary-500',
            {
              'bottom-0': isFirstElementInBody,
              'left-1': isFirstElementInBody,
              '-top-6': !isFirstElementInBody
            }
          )}
          variant='default'>
          {name}
        </Badge>
      )}

      {(content as EditorElement[]).map((item, index) => (
        <Recursive key={item.id} index={index} {...item} parentId={id} />
      ))}

      {selectedElement.id === id && (
        <Badge
          onClick={handleDeleteElement}
          className={cn(
            'absolute right-0 z-20 flex cursor-pointer gap-1 rounded-none rounded-t-lg',
            {
              'bottom-0': isFirstElementInBody,
              'right-1': isFirstElementInBody,
              '-top-6': !isFirstElementInBody
            }
          )}
          variant='destructive'>
          Delete
          <Trash size={16} />
        </Badge>
      )}
    </div>
  )
}
