'use client'

import { memo } from 'react'

import { m } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

import Recursive from './recursive'
import { addElementByType } from '@/helper/editor.helper'
import { cn } from '@/lib/utils'
import { ComponentName, EditorElement, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

const Canvas = memo((props: RecursiveComponent) => {
  const { id, content } = props

  const [device, selectedElement, onAddElement, onDeleteElement] = useEditorStore(
    useShallow((state) => [
      state.device,
      state.selectedElement,
      state.onAddElement,
      state.onDeleteElement
    ])
  )

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation()

    const dragItem = e.dataTransfer.getData('text')

    if (isNaN(Number(dragItem))) {
      const value = addElementByType(dragItem as ComponentName)
      if (typeof value !== 'undefined') {
        onAddElement(id, value)
        return
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation()
    e.preventDefault()

    onDeleteElement(id)
  }

  return (
    <>
      <div
        id={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'relative mx-auto h-full overflow-auto rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500 dark:bg-zinc-900',
          deviceSize[device]
        )}>
        {(content as EditorElement[]).map((i, index) => (
          <Recursive key={i.id} {...i} index={index} parentId={id} />
        ))}

        {selectedElement.id ? (
          <div className='absolute bottom-1 right-1 flex h-[40px] w-[200px] cursor-pointer gap-1 opacity-40 transition-all hover:opacity-100'>
            <div
              className='flex w-full items-center justify-center rounded-md bg-danger-400'
              aria-hidden
              onClick={(e) => handleDeleteElement(e, selectedElement.id)}>
              Delete
              <span className='ml-2 text-foreground-700'>{selectedElement.name}</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
})

Canvas.displayName = 'Canvas'

const EditorCanvas = () => {
  const [elements] = useEditorStore(useShallow((state) => [state.elements]))

  return (
    <m.section
      layout
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        ease: 'linear'
      }}
      className='h-full w-9/12 border-r border-t border-default-300 bg-zinc-800/10 p-1'>
      {elements.map((item, index) => (
        <Canvas key={item.id} {...item} index={index} parentId={item.id} />
      ))}
    </m.section>
  )
}

export default EditorCanvas

const deviceSize = {
  Desktop: 'max-w-full',
  Tablet: 'max-w-4xl',
  Mobile: 'max-w-md'
}
