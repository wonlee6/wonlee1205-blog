'use client'

import React, { useRef } from 'react'

import { TrashIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import Recursive from '../../canvas/recursive'
import { Badge } from '@/components/ui/badge'
import { addElementByType } from '@/helper/editor.helper'
import { cn } from '@/lib/utils'
import { ComponentName, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Flex(props: RecursiveComponent<'Flex'>) {
  const { id, name, styles, group, content, index, parentId } = props

  const [
    liveMode,
    selectedElement,
    onAddElement,
    onSelectElement,
    onDeleteElement,
    onDragItemOrder
  ] = useEditorStore(
    useShallow((state) => [
      state.liveMode,
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
    if (liveMode) return

    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (liveMode) return

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (liveMode) return

    if (e.key === 'Delete') {
      e.preventDefault()
      e.stopPropagation()
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
        'border-dashed': selectedElement.id === id && !liveMode,
        'border-primary-500 outline-none': selectedElement.id === id && !liveMode,
        'border-none': liveMode,
        'cursor-default': liveMode
      })}
      style={{
        ...styles,
        minHeight: content.length > 0 ? undefined : '6rem'
      }}>
      {content.map((item, index) => (
        <Recursive key={item.id} index={index} {...item} parentId={id} />
      ))}

      {!liveMode && selectedElement.id === id && (
        <>
          <Badge
            className={cn(
              'absolute left-0 z-20 cursor-pointer rounded-none bg-primary-500 hover:bg-primary-400',
              isFirstElementInBody ? 'top-0 rounded-b-lg' : '-top-6 rounded-t-lg'
            )}
            variant='default'>
            {name}
          </Badge>

          <Badge
            onClick={handleDeleteElement}
            className={cn(
              'absolute right-0 z-20 flex cursor-pointer gap-1 rounded-none',
              isFirstElementInBody ? 'top-0 rounded-b-lg' : '-top-6 rounded-t-lg'
            )}
            variant='destructive'>
            Delete
            <TrashIcon size={16} />
          </Badge>
        </>
      )}
    </div>
  )
}
