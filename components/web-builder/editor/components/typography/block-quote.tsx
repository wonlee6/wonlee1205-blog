'use client'

import React, { useState } from 'react'

import SettingPopover from '../setting-popover'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function BlockQuote(props: RecursiveComponent<'BlockQuote'>) {
  const { content, name, id, styles, group, customStyles, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const [blockQuote, setBlockQuote] = useState(content.text)

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

  const handleClick = (e: React.MouseEvent<HTMLQuoteElement>) => {
    if (liveMode) return

    e.stopPropagation()

    handleSelectElement()
  }

  const handleDeleteByKeyDown = (e: React.KeyboardEvent) => {
    if (liveMode) return

    if (e.key === 'Delete') {
      e.preventDefault()
      e.stopPropagation()
      onDeleteElement(id)
    }
  }

  const handleUpdateBlockQuote = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        text: blockQuote
      })
    }
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <blockquote
      className={cn(
        'relative inline-block w-full border-l-8',
        !liveMode && 'hover:ring-1 hover:ring-primary-200',
        {
          'border-y border-r border-y-primary-500 border-r-primary-500':
            selectedElement.id === id && !liveMode,
          'cursor-default': liveMode
        }
      )}
      onClick={handleClick}
      onKeyDown={handleDeleteByKeyDown}
      onDragStart={onDragStartInElement}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropInElement}
      style={styles}
      draggable>
      {content.text}
      <SettingPopover onOpenChange={handleUpdateBlockQuote}>
        <SettingPopover.Trigger
          name='Block Quote'
          isShowBadge={selectedElement.id === id && !liveMode}
          isFirstElementInBody={isFirstElementInBody}
        />
        <SettingPopover.Content
          title='Block Quote'
          onDeleteElement={handleDeleteElement}
          onDeleteElementByKeyboard={handleDeleteByKeyDown}>
          <Label htmlFor='blockQuote-text'>Text</Label>
          <Textarea
            id='blockQuote-text'
            value={blockQuote}
            onChange={(e) => setBlockQuote(e.currentTarget.value)}
            maxLength={2000}
          />
        </SettingPopover.Content>
      </SettingPopover>
    </blockquote>
  )
}
