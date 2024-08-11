'use client'

import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { Plus, Settings, Play, Monitor, Smartphone, TabletSmartphone, DoorOpen } from 'lucide-react'

const EditorToolbox = () => {
  return (
    <>
      <div className='flex min-h-14 w-full items-center justify-between border-b border-gray-800 px-4'>
        <div className='flex items-center gap-4'>
          <Button variant='light' startContent={<DoorOpen />}>
            Back
          </Button>
          <div className='flex flex-col gap-1'>
            <h2 className='text-base'>title</h2>
            <span className='text-sm text-foreground-500'>description</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button isIconOnly variant='light'>
            <Monitor />
          </Button>
          <Button isIconOnly variant='light'>
            <TabletSmartphone />
          </Button>
          <Button isIconOnly variant='light'>
            <Smartphone />
          </Button>
        </div>
        <div className='flex items-center gap-4'>
          <Button isIconOnly variant='light'>
            <Play />
          </Button>
          <Button variant='shadow' color='primary'>
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

const EditorCanvas = ({ children }: { children?: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })

  return (
    <>
      <div
        ref={setNodeRef}
        className='relative h-full w-3/4 overflow-auto border-r border-t border-gray-800 p-1'>
        {children}
      </div>
    </>
  )
}

const EditorAttributes = ({ children }: { children?: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform)
      }
    : undefined

  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <>
      <div className='flex h-full w-1/4 border-l border-t border-gray-800'>
        <div className='flex w-10/12 flex-col gap-4 border-r border-gray-800'>
          <div className='p-1'>
            <Accordion selectionMode='single' isCompact variant='bordered' className='rounded-none'>
              <AccordionItem key='1' aria-label='Accordion 1' title='Accordion 1'>
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
          <div className='p-1'>
            <Accordion selectionMode='multiple' isCompact variant='shadow'>
              <AccordionItem key='1' aria-label='Accordion 1' title='Accordion 1'>
                {defaultContent}
              </AccordionItem>
              <AccordionItem key='2' aria-label='Accordion 2' title='Accordion 2'>
                {defaultContent}
              </AccordionItem>
              <AccordionItem key='3' aria-label='Accordion 3' title='Accordion 3'>
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className='flex w-2/12 flex-col items-center gap-4 border-l border-gray-800 p-1'>
          <Button isIconOnly size='lg' variant='light'>
            <Settings />
          </Button>
          <Button isIconOnly size='lg' variant='light'>
            <Plus />
          </Button>
        </div>
      </div>
    </>
  )
}

const Editor = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex size-full h-auto flex-col'>{children}</div>
    </>
  )
}

Editor.Toolbox = EditorToolbox
Editor.Canvas = EditorCanvas
Editor.Attributes = EditorAttributes
export default Editor
