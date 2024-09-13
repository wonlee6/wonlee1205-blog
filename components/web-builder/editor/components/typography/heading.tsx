'use client'

import React, { useState } from 'react'

import SettingPopover from '../setting-popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'
import { HeadingDefaultStyles } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function Heading(props: RecursiveComponent<'Heading'>) {
  const { content, name, id, styles, group, index, parentId } = props

  const {
    liveMode,
    selectedElement,
    onSelectElement,
    onDragItemOrder,
    onDeleteElement,
    onUpdateContentInElement,
    onUpdateElementStyle
  } = useEditorStore((state) => state)

  const [headingText, setHeadingText] = useState(content.text)

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

  const handleHeadingValue = (open: boolean) => {
    if (!open) {
      onUpdateContentInElement({
        ...content,
        text: headingText
      })
    }
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onDeleteElement(id)
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

  const handleSelectHeading = (value: string) => {
    let headingStyle = null
    switch (value) {
      case '1':
        headingStyle = HeadingDefaultStyles
        break
      case '2':
        headingStyle = Heading2DefaultStyles
        break
      case '3':
        headingStyle = Heading3DefaultStyles
        break
      case '4':
        headingStyle = Heading4DefaultStyles
        break
      case '5':
        headingStyle = Heading5DefaultStyles
        break
      default:
        break
    }
    onUpdateElementStyle(headingStyle!)
  }

  let headingCompo = null
  switch (content.heading) {
    case 1:
      headingCompo = (
        <h1 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h1>
      )
      break
    case 2:
      headingCompo = (
        <h2 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h2>
      )
      break
    case 3:
      headingCompo = (
        <h3 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h3>
      )
      break
    case 4:
      headingCompo = (
        <h4 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h4>
      )
      break
    case 5:
      headingCompo = (
        <h5 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h5>
      )
      break
    case 6:
      headingCompo = (
        <h6 style={styles} onClick={handleClick} aria-label={content.text} onKeyDown={() => {}}>
          {content.text}
        </h6>
      )
      break
    default:
      return null
  }

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div
      className={cn('relative w-full', {
        'border border-dashed border-primary-500': selectedElement.id === id && !liveMode,
        'border-none': liveMode,
        'cursor-default': liveMode
      })}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      aria-hidden>
      {headingCompo}
      <SettingPopover onOpenChange={handleHeadingValue}>
        <SettingPopover.Trigger
          isShowBadge={selectedElement.id === id && !liveMode}
          name='Heading'
          isFirstElementInBody={isFirstElementInBody}
        />
        <SettingPopover.Content
          title='Heading'
          onDeleteElement={handleDeleteElement}
          onDeleteElementByKeyboard={handleDeleteByKeyDown}>
          <RadioGroup
            defaultValue={String(content.heading)}
            className='flex flex-row'
            onValueChange={handleSelectHeading}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='1' id='heading-h1' />
              <Label htmlFor='heading-h1'>h1</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='2' id='heading-h2' />
              <Label htmlFor='heading-h2'>h2</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='3' id='heading-h3' />
              <Label htmlFor='heading-h3'>h3</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='4' id='heading-h4' />
              <Label htmlFor='heading-h4'>h4</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='5' id='heading-h5' />
              <Label htmlFor='heading-h5'>h5</Label>
            </div>
          </RadioGroup>
          <Label htmlFor='label-text' className='mt-2 text-xs'>
            Text
          </Label>
          <Input
            id='heading-text'
            value={headingText}
            onChange={(e) => setHeadingText(e.target.value)}
            maxLength={255}
            autoComplete='off'
          />
        </SettingPopover.Content>
      </SettingPopover>
    </div>
  )
}

const Heading2DefaultStyles: React.CSSProperties = {
  marginTop: '1.25rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '2.25rem',
  lineHeight: '2.5rem'
}

const Heading3DefaultStyles: React.CSSProperties = {
  marginTop: '1rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  lineHeight: '2rem'
}

const Heading4DefaultStyles: React.CSSProperties = {
  marginTop: '0.7rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '1.125rem',
  lineHeight: '1.75rem'
}

const Heading5DefaultStyles: React.CSSProperties = {
  marginTop: '0.7rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  lineHeight: '1.25rem'
}

const Heading6DefaultStyles: React.CSSProperties = {
  marginTop: '0.7rem',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  lineHeight: '1rem'
}
