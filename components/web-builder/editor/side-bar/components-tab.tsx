'use client'

import React from 'react'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { BoxSelect, CircleArrowLeftIcon, TagIcon, TypeIcon, YoutubeIcon } from 'lucide-react'

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
          aria-label='Layout'
          title='Layout'
          classNames={{ heading: 'font-bold' }}>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-4'>
              {layoutList.map((item) => (
                <div key={item.name} className='flex flex-col items-center justify-center gap-1'>
                  <div
                    className='cursor-grab rounded-lg p-1 transition-all hover:bg-default-200'
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.name)}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          key='2'
          aria-label='Elements'
          title='Elements'
          classNames={{ heading: 'font-bold' }}>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-4 gap-2'>
              {elementList.map((item) => (
                <div key={item.name} className='flex flex-col items-center justify-center gap-0'>
                  <div
                    className='cursor-grab rounded-lg p-1 transition-all hover:bg-default-200'
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.name)}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}

const layoutList = [{ name: 'Flex', icon: <BoxSelect size={40} /> }]
const elementList = [
  { name: 'Label', icon: <TagIcon size={40} /> },
  { name: 'Text', icon: <TypeIcon size={40} /> },
  { name: 'Button', icon: <CircleArrowLeftIcon size={40} /> },
  { name: 'YouTube', icon: <YoutubeIcon size={40} /> }
]

// Text Link, Heading

// Image, Video, Youtube
// <Youtube />

// Label, Input, Text Area Checkbox, Radio Button, Button
// <TextCursor />
