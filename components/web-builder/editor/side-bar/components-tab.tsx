'use client'

import React from 'react'

import { Accordion, AccordionItem } from '@nextui-org/react'
import {
  BoxSelect,
  CircleArrowLeftIcon,
  HeadingIcon,
  ImageIcon,
  LetterTextIcon,
  LinkIcon,
  PilcrowIcon,
  TagIcon,
  TextQuoteIcon,
  TypeIcon,
  YoutubeIcon
} from 'lucide-react'

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
                  onDragStart={(e) => handleDragStart(e, item.name)}>
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
                  onDragStart={(e) => handleDragStart(e, item.name)}>
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
                  onDragStart={(e) => handleDragStart(e, item.name)}>
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

const structureList = [{ name: 'Flex', icon: <BoxSelect size={40} /> }]

const typographyList = [
  { name: 'Heading', icon: <HeadingIcon size={40} /> },
  { name: 'Paragraph', icon: <PilcrowIcon size={40} /> },
  { name: 'Text Link', icon: <LinkIcon size={40} /> },
  { name: 'Block Quote', icon: <TextQuoteIcon size={40} /> }
]

const formList = [
  { name: 'Label', icon: <TagIcon size={40} /> },
  { name: 'Text', icon: <TypeIcon size={40} /> },
  { name: 'Text Area', icon: <LetterTextIcon size={40} /> },
  { name: 'Button', icon: <CircleArrowLeftIcon size={40} /> }
]

const mediaList = [
  { name: 'Image', icon: <ImageIcon size={40} /> },
  { name: 'YouTube', icon: <YoutubeIcon size={40} /> }
]
