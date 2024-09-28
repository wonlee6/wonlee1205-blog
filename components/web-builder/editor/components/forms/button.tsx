'use client'

import React, { useRef, useState } from 'react'

import { Checkbox } from '@nextui-org/react'

import SettingPopover from '../setting-popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useDragAndDrop from '@/hooks/useDragAndDrop'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function ButtonElement(props: RecursiveComponent<'Button'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const { onDragStartInElement, onDropInElement } = useDragAndDrop(index, parentId)

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleSelectElement = () => {
    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (liveMode) return

    e.stopPropagation()

    handleSelectElement()
  }

  const handleFocus = (e: React.FormEvent<HTMLButtonElement>) => {
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

  const [buttonOption, setButtonOption] = useState<{ label: string; url: string }>({
    label: content.innerText ?? '',
    url: ''
  })
  const [isNewTap, setIsNewTap] = useState(false)

  const handleButtonLabelValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        innerText: buttonOption.label,
        ...(buttonOption.url !== '' && { url: buttonOption.url }),
        ...(isNewTap && { isNewTap })
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
    <div className={cn('relative w-min', !liveMode && 'hover:ring-1 hover:ring-primary-200')}>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        onFocus={handleFocus}
        style={styles}
        tabIndex={0}
        aria-label={buttonOption.label}
        draggable
        onDragStart={onDragStartInElement}
        onDrop={onDropInElement}
        onDragOver={(e) => e.preventDefault()}
        onKeyDown={handleDeleteKeyDown}>
        {buttonOption.label}
      </Button>
      {!liveMode ? (
        <SettingPopover onOpenChange={handleButtonLabelValue}>
          <SettingPopover.Trigger
            isShowBadge={selectedElement.id === id && !liveMode}
            name='Button'
            isFirstElementInBody={isFirstElementInBody}
          />
          <SettingPopover.Content
            title='Button'
            onDeleteElement={handleDeleteElement}
            onDeleteElementByKeyboard={handleDeleteElementByKeyboard}>
            <Label htmlFor='button-label'>Label</Label>
            <Input
              id='button-label'
              value={buttonOption.label}
              onChange={(e) => setButtonOption((prev) => ({ ...prev, label: e.target.value }))}
              maxLength={255}
              autoComplete='off'
            />
            <Label htmlFor='button-href'>URL</Label>
            <Input
              id='button-label'
              value={buttonOption.url}
              onChange={(e) => setButtonOption((prev) => ({ ...prev, url: e.target.value }))}
              maxLength={255}
              autoComplete='off'
              placeholder='e.g. http://www.google.com'
            />
            <div className='flex items-center'>
              <Checkbox id='button-tap' size='sm' isSelected={isNewTap} onValueChange={setIsNewTap}>
                Open in new tap
              </Checkbox>
            </div>
          </SettingPopover.Content>
        </SettingPopover>
      ) : null}
    </div>
  )
}
