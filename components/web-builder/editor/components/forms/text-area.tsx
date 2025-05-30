'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/providers/user-store-provider'
import { RecursiveComponent } from '@/types/web-builder'

import SettingPopover from '../setting-popover'

export default function TextAreaElement(props: RecursiveComponent<'TextArea'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const [textAreaOption, setTextAreaOption] = useState<{ id: string; maxLength: number }>({
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

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (liveMode) return
    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLTextAreaElement>) => {
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
        maxLength: textAreaOption.maxLength,
        id: textAreaOption.id
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
      <Textarea
        id={textAreaOption.id}
        onClick={handleClick}
        onFocus={handleFocus}
        aria-label={content.innerText}
        placeholder={content.innerText}
        className={'relative w-full rounded-sm border-default-300'}
        style={styles}
        tabIndex={0}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={onDragStartInElement}
        onDrop={onDropInElement}
        maxLength={textAreaOption.maxLength}
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
              value={textAreaOption.id}
              onChange={(e) => setTextAreaOption((prev) => ({ ...prev, id: e.target.value }))}
              maxLength={255}
              autoComplete='off'
            />
            <Label htmlFor='text-maxLength'>Max Length</Label>
            <Input
              id='text-maxLength'
              type='number'
              value={textAreaOption.maxLength}
              onChange={(e) =>
                setTextAreaOption((prev) => ({ ...prev, maxLength: +e.target.value }))
              }
              autoComplete='off'
            />
          </SettingPopover.Content>
        </SettingPopover>
      ) : null}
    </div>
  )
}
