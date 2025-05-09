'use client'

import React, { useId, useState } from 'react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/providers/user-store-provider'
import { RecursiveComponent } from '@/types/web-builder'

import SettingPopover from '../setting-popover'

export default function Paragraph(props: RecursiveComponent<'Paragraph'>) {
  const { content, name, id, styles, group, customStyles, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const uid = useId()

  const [paragraph, setParagraph] = useState(content.text)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content,
      customStyles
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (liveMode) return

    e.stopPropagation()

    handleSelectElement()
  }

  const handleUpdateParagraph = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        text: paragraph
      })
    }
  }

  const handleDeleteByKeyDown = (e: React.KeyboardEvent) => {
    if (liveMode) return

    if (e.key === 'Delete') {
      e.preventDefault()
      e.stopPropagation()
      onDeleteElement(id)
    }
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <p
      className={cn('relative w-full', !liveMode && 'hover:ring-1 hover:ring-primary-200', {
        'border border-dashed border-primary-500': selectedElement.id === id && !liveMode,
        'border-none': liveMode,
        'cursor-default': liveMode
      })}
      onClick={handleClick}
      onKeyDown={handleDeleteByKeyDown}
      onDragStart={onDragStartInElement}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropInElement}
      draggable
      style={styles}>
      {paragraph}
      <SettingPopover onOpenChange={handleUpdateParagraph}>
        <SettingPopover.Trigger
          name='Paragraph'
          isShowBadge={selectedElement.id === id && !liveMode}
          isShowBadgeIcon={false}
          isFirstElementInBody={isFirstElementInBody}
        />
        <SettingPopover.Content
          title='Paragraph'
          onDeleteElement={() => onDeleteElement(id)}
          onDeleteElementByKeyboard={handleDeleteByKeyDown}
          className='w-[500px]'>
          <Label htmlFor={uid + '-paragraph'}>Text</Label>
          <Textarea
            id={uid + '-paragraph'}
            value={paragraph}
            onChange={(e) => setParagraph(e.currentTarget.value)}
            maxLength={2000}
            rows={10}
          />
        </SettingPopover.Content>
      </SettingPopover>
    </p>
  )
}
