'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import {
  BoxIcon,
  CircleArrowLeftIcon,
  HeadingIcon,
  ImageIcon,
  LetterTextIcon,
  LinkIcon,
  PackageIcon,
  PilcrowIcon,
  TagIcon,
  TextQuoteIcon,
  TypeIcon,
  YoutubeIcon
} from 'lucide-react'
import React from 'react'

export default function ComponentsTab() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', item)
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  return (
    <>
      <Accordion
        selectionMode='multiple'
        variant='shadow'
        className='rounded-sm'
        defaultExpandedKeys='all'>
        <AccordionItem
          key='1'
          aria-label='Structure'
          title='Structure'
          classNames={{ heading: 'font-bold' }}>
          <div className='grid grid-cols-3'>
            {structureList.map((item) => (
              <div
                key={item.name}
                className='group flex flex-col items-center justify-center gap-1'>
                <div
                  className='cursor-grab rounded-lg p-1 transition-all group-hover:bg-default-200'
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.name)}>
                  {item.icon}
                </div>
                <span className='cursor-default select-none'>{item.name}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem
          key='2'
          aria-label='Typography'
          title='Typography'
          classNames={{ heading: 'font-bold' }}>
          <div className='grid grid-cols-3 gap-2'>
            {typographyList.map((item) => (
              <div
                key={item.name}
                className='group flex flex-col items-center justify-center gap-0'>
                <div
                  className='cursor-grab rounded-lg p-1 transition-all group-hover:bg-default-200'
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.value)}>
                  {item.icon}
                </div>
                <span className='cursor-default select-none whitespace-nowrap'>{item.name}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem
          key='3'
          aria-label='Forms'
          title='Forms'
          classNames={{ heading: 'font-bold' }}>
          <div className='grid grid-cols-3 gap-2'>
            {formList.map((item) => (
              <div
                key={item.name}
                className='group flex flex-col items-center justify-center gap-0'>
                <div
                  className='cursor-grab rounded-lg p-1 transition-all group-hover:bg-default-200'
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.value)}>
                  {item.icon}
                </div>
                <span className='cursor-default select-none whitespace-nowrap'>{item.name}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem
          key='4'
          aria-label='Media'
          title='Media'
          classNames={{ heading: 'font-bold' }}>
          <div className='grid grid-cols-3 gap-2'>
            {mediaList.map((item) => (
              <div
                key={item.name}
                className='group flex flex-col items-center justify-center gap-0'>
                <div
                  className='cursor-grab rounded-lg p-1 transition-all group-hover:bg-default-200'
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.value)}>
                  {item.icon}
                </div>
                <span className='cursor-default select-none whitespace-nowrap'>{item.name}</span>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}

const structureList = [
  { name: 'Block', icon: <BoxIcon size={40} /> },
  { name: 'Flex', icon: <PackageIcon size={40} /> }
]

const typographyList = [
  { name: 'Heading', value: 'Heading', icon: <HeadingIcon size={40} /> },
  { name: 'Paragraph', value: 'Paragraph', icon: <PilcrowIcon size={40} /> },
  { name: 'Text Link', value: 'TextLink', icon: <LinkIcon size={40} /> },
  { name: 'Block Quote', value: 'BlockQuote', icon: <TextQuoteIcon size={40} /> }
]

const formList = [
  { name: 'Label', value: 'Label', icon: <TagIcon size={40} /> },
  { name: 'Text', value: 'Text', icon: <TypeIcon size={40} /> },
  { name: 'Text Area', value: 'TextArea', icon: <LetterTextIcon size={40} /> },
  { name: 'Button', value: 'Button', icon: <CircleArrowLeftIcon size={40} /> }
]

const mediaList = [
  { name: 'Image', value: 'Image', icon: <ImageIcon size={40} /> },
  { name: 'YouTube', value: 'YouTube', icon: <YoutubeIcon size={40} /> }
]
