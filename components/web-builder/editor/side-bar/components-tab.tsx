'use client'

import React, { memo } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

import { BoxSelect, Type } from 'lucide-react'

function ComponentsTab() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', item)
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  return (
    <div>
      <Accordion
        selectionMode='multiple'
        variant='shadow'
        className='rounded-none'
        defaultExpandedKeys='all'>
        <AccordionItem
          key='1'
          aria-label='Layout'
          title='Layout'
          classNames={{ heading: 'font-bold', content: 'pb-4' }}>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap'>
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
          classNames={{ heading: 'font-bold', content: 'pb-4' }}>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap'>
              {elementList.map((item) => (
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
      </Accordion>
    </div>
  )
}

export default memo(ComponentsTab)

const layoutList = [{ name: 'Container', icon: <BoxSelect size={50} /> }]
const elementList = [{ name: 'Text', icon: <Type size={50} /> }]

// Text Link, Heading

// Image, Video, Youtube

// Label, Input, Text Area Checkbox, Radio Button, Button
