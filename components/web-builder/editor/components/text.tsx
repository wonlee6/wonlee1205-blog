'use client'

import { useRef } from 'react'
import { Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { EditorElement, ElementType } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Text(props: EditorElement) {
  const { content, name, id, styles, type } = props

  const { selectedElement, onSelectElement, onDeleteElement } = useEditorStore((state) => state)

  const inputRef = useRef<HTMLInputElement | null>(null)

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

  const handleFocus = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
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
        placeholder={(content as ElementType).innerText}
        className={'relative w-full rounded-sm border-default-300 dark:border-default-300'}
        style={styles}
        tabIndex={0}
      />

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
