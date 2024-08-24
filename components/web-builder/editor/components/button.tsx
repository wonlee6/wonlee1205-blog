'use client'

import React, { useRef } from 'react'
import { Trash } from 'lucide-react'
import { useEditorStore } from '@/providers/user-store-provider'
import { EditorElement, ElementType } from '@/model/web-builder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ButtonElement(props: EditorElement) {
  const { content, name, id, styles, group } = props

  const { selectedElement, onSelectElement, onDeleteElement } = useEditorStore((state) => state)

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

  return (
    <div className='relative w-min'>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        onFocus={handleFocus}
        style={styles}
        tabIndex={0}>
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
