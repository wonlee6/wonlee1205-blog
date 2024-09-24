'use client'

import React, { useState } from 'react'

import SettingPopover from '../setting-popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function LabelElement(props: RecursiveComponent<'Label'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (liveMode) return

    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLLabelElement>) => {
    if (liveMode) return

    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    if (liveMode) return

    e.preventDefault()

    onDeleteElement(id)
  }

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (liveMode) return

    if (e.key === 'Delete') {
      e.preventDefault()
      e.stopPropagation()
      onDeleteElement(id)
    }
  }

  const [labelOption, setLabelOption] = useState<{ text: string; id: string | null }>({
    text: content.text,
    id: content.id
  })

  const handleUpdateLabelValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        innerText: labelOption.text,
        ...(labelOption.id !== '' && { id: labelOption.id })
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
      <Label
        htmlFor={liveMode && labelOption.id ? labelOption.id : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        className={liveMode ? '' : 'border'}
        style={styles}
        tabIndex={0}
        aria-label={labelOption.text}
        draggable
        onDragStart={onDragStartInElement}
        onDrop={onDropInElement}
        onDragOver={(e) => e.preventDefault()}
        onKeyDown={handleDeleteKeyDown}>
        {labelOption.text}
      </Label>
      {!liveMode ? (
        <SettingPopover onOpenChange={handleUpdateLabelValue}>
          <SettingPopover.Trigger
            isShowBadge={selectedElement.id === id && !liveMode}
            name='Label'
            isFirstElementInBody={isFirstElementInBody}
          />
          <SettingPopover.Content
            title='Label'
            onDeleteElement={handleDeleteElement}
            onDeleteElementByKeyboard={handleDeleteElementByKeyboard}>
            <Label htmlFor='label-text'>Text</Label>
            <Input
              id='label-text'
              value={labelOption.text}
              onChange={(e) => setLabelOption((prev) => ({ ...prev, text: e.target.value }))}
              maxLength={255}
              autoComplete='off'
            />
            <Label htmlFor='label-id'>ID</Label>
            <Input
              id='label-id'
              value={labelOption.id ? labelOption.id : ''}
              onChange={(e) => setLabelOption((prev) => ({ ...prev, id: e.target.value }))}
              maxLength={255}
              autoComplete='off'
            />
          </SettingPopover.Content>
        </SettingPopover>
      ) : null}
    </div>
  )
}
