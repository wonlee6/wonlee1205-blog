'use client'

import React from 'react'

import SettingPopover from '../setting-popover'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Paragraph(props: RecursiveComponent<'Paragraph'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement } = useEditorStore(
    (state) => state
  )

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

  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
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
      {content.text}
      <SettingPopover>
        <SettingPopover.Trigger
          name='Paragraph'
          isShowBadge={selectedElement.id === id && !liveMode}
          isShowBadgeIcon={false}
          isFirstElementInBody={isFirstElementInBody}
        />
      </SettingPopover>
    </p>
  )
}
