'use client'

import React, { memo } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

import { BoxSelect, Type } from 'lucide-react'

function DragComponents() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', 'title')
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
              <div className='flex flex-col items-center justify-center gap-1'>
                <div
                  className='cursor-grab rounded-lg p-1 transition-all hover:bg-default-200'
                  draggable
                  onDragStart={handleDragStart}>
                  <BoxSelect size={50} />
                </div>
                <span>Container</span>
              </div>
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
              <div className='flex flex-col items-center justify-center gap-1'>
                <div className='cursor-grab rounded-lg p-1 transition-all hover:bg-default-200'>
                  <Type size={50} />
                </div>
                <span>Container</span>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default memo(DragComponents)
