'use client'

import { addElementByType } from '@/lib/editor'
import { ComponentType, EditorElement } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'
import React from 'react'
import Recursive from '../canvas/recursive'
import { Badge } from '@/components/ui/badge'

export default function Container(props: EditorElement) {
  const { id, name, styles, type, content } = props

  const { handleAddElement } = useEditorStore((state) => state)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const componentType = e.dataTransfer.getData('text')
    console.log(componentType)

    const value = addElementByType(componentType as ComponentType)
    if (typeof value === 'undefined') {
      return
    }
    handleAddElement(id, value)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='relative flex h-20 w-full border border-dashed border-primary-500 p-2'
        style={styles}>
        <Badge
          className='absolute -top-6 left-0 cursor-pointer rounded-none rounded-t-lg bg-primary-500'
          variant='default'>
          {name}
        </Badge>

        {(content as EditorElement[]).map((item) => (
          <Recursive key={item.id} {...item} />
        ))}
      </div>
    </>
  )
}
