'use client'

import { useRef, useState } from 'react'

import SettingPopover from '../setting-popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Text(props: RecursiveComponent<'Text'>) {
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
    id: content.id,
    maxLength: content.maxLength
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
        aria-label={content.innerText}
        placeholder={content.innerText}
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
        <SettingPopover onOpenChange={handleUpdateTextValue}>
          <SettingPopover.Trigger
            isShowBadge={selectedElement.id === id}
            name={name}
            isFirstElementInBody={isFirstElementInBody}
          />
          <SettingPopover.Content
            title='Text'
            onDeleteElement={handleDeleteElement}
            onDeleteElementByKeyboard={handleDeleteElementByKeyboard}>
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
              onChange={(e) => setTextOption((prev) => ({ ...prev, maxLength: +e.target.value }))}
              autoComplete='off'
            />
          </SettingPopover.Content>
        </SettingPopover>
      ) : null}
    </div>
  )
}
