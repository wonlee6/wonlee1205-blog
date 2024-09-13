'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import SettingPopover from '../setting-popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function TextLink(props: RecursiveComponent<'TextLink'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    onSelectElement,
    onDragItemOrder,
    onDeleteElement,
    onUpdateContentInElement
  } = useEditorStore((state) => state)

  const [textLink, setTextLink] = useState({
    url: content.href,
    text: content.text,
    prefetch: content.prefetch
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

  const handleSelect = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (liveMode) return
    e.stopPropagation()

    handleSelectElement()
  }

  const handleUpdateTextLinkValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        ...textLink
      })
    }
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
  }

  const handleDeleteByKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div
      className={cn('relative inline-block', {
        'border border-dashed border-primary-500': selectedElement.id === id && !liveMode,
        'border-none': liveMode,
        'cursor-default': liveMode
      })}
      onClick={handleSelect}
      onKeyDown={handleDeleteByKeyDown}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      aria-hidden>
      {liveMode ? (
        <Link
          href={textLink.url === '' ? '#' : textLink.url}
          target='_blank'
          prefetch={textLink.prefetch}
          style={styles}>
          {content.text}
        </Link>
      ) : (
        <span style={styles}>{content.text}</span>
      )}

      <SettingPopover onOpenChange={handleUpdateTextLinkValue}>
        <SettingPopover.Trigger
          isShowBadge={selectedElement.id === id && !liveMode}
          name='Text Link'
          isFirstElementInBody={isFirstElementInBody}
        />
        <SettingPopover.Content
          title='Text Link'
          onDeleteElement={handleDeleteElement}
          onDeleteElementByKeyboard={handleDeleteByKeyDown}>
          <Label htmlFor='textLink-text'>Text</Label>
          <Input
            id='textLink-text'
            value={textLink.text}
            onChange={(e) => setTextLink((prev) => ({ ...prev, text: e.target.value }))}
            maxLength={255}
            autoComplete='off'
          />
          <Label htmlFor='textLink-url'>URL</Label>
          <Input
            id='textLink-url'
            value={textLink.url}
            onChange={(e) => setTextLink((prev) => ({ ...prev, url: e.target.value }))}
            maxLength={1000}
            autoComplete='off'
            placeholder='e.g. https://www.google.com'
          />
          <Select
            value={
              textLink.prefetch === true
                ? 'true'
                : textLink.prefetch === false
                  ? 'false'
                  : 'default'
            }
            onValueChange={(value) => {
              let v: boolean | undefined = undefined
              if (value === 'default') {
                v = undefined
              } else if (value === 'true') {
                v = true
              } else {
                v = false
              }
              setTextLink((prev) => ({ ...prev, prefetch: v }))
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select Prefetch' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='default'>default</SelectItem>
                <SelectItem value='true'>true</SelectItem>
                <SelectItem value='false'>false</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </SettingPopover.Content>
      </SettingPopover>
    </div>
  )
}