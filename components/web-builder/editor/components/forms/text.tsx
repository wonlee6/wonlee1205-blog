'use client'

import { useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/providers/user-store-provider'
import { RecursiveComponent } from '@/types/web-builder'

import SettingPopover from '../setting-popover'

export default function Text(props: RecursiveComponent<'Text'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [textOption, setTextOption] = useState<{ id: string; maxLength: number }>({
    id: content.id,
    maxLength: content.maxLength
  })

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
    if (liveMode) return
    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLInputElement>) => {
    if (liveMode) return
    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    if (liveMode) return
    e.stopPropagation()
    onDeleteElement(id)
  }

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
    <div className={cn('relative w-full', !liveMode && 'hover:ring-1 hover:ring-primary-200')}>
      <Input
        ref={inputRef}
        id={textOption.id ? textOption.id : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-label={content.innerText}
        placeholder={content.innerText}
        className={'w-full rounded-sm border-default-300'}
        style={styles}
        tabIndex={0}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={onDragStartInElement}
        onDrop={onDropInElement}
        maxLength={textOption.maxLength}
      />
      {!liveMode ? (
        <SettingPopover onOpenChange={handleUpdateTextValue}>
          <SettingPopover.Trigger
            isShowBadge={selectedElement.id === id && !liveMode}
            name='Text'
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
