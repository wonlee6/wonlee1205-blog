'use client'

import React from 'react'

import SettingPopover from '../setting-popover'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Paragraph(props: RecursiveComponent<'Paragraph'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDragItemOrder, onDeleteElement } =
    useEditorStore((state) => state)

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

  const handleDragStart = (e: React.DragEvent) => {
    if (liveMode) return
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent) => {
    if (liveMode) return
    e.stopPropagation()

    const sourceIndex = e.dataTransfer.getData('text')
    const destinationIndex = index
    onDragItemOrder(parentId, Number(sourceIndex), Number(destinationIndex))
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <p
      className={cn('relative w-full', {
        'border border-dashed border-primary-500': selectedElement.id === id && !liveMode,
        'border-none': liveMode,
        'cursor-default': liveMode
      })}
      onClick={handleClick}
      onKeyDown={handleDeleteByKeyDown}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
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
