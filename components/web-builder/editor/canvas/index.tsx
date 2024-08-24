'use client'

import { memo, useEffect } from 'react'
import { m } from 'framer-motion'
import { useEditorStore } from '@/providers/user-store-provider'
import { ComponentName, EditorElement, RecursiveComponent } from '@/model/web-builder'
import Recursive from './recursive'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import { addElementByType } from '@/helper/editor.helper'

const Canvas = memo((props: RecursiveComponent) => {
  const { id, content } = props

  const [device, onAddElement] = useEditorStore(
    useShallow((state) => [state.device, state.onAddElement])
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

  return (
    <>
      <div
        id={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'relative mx-auto h-full space-y-4 rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500 dark:bg-zinc-900',
          deviceSize[device]
        )}>
        {(content as EditorElement[]).map((i, index) => (
          <Recursive key={i.id} {...i} index={index} parentId={id} />
        ))}
      </div>
    </>
  )
})

Canvas.displayName = 'Canvas'

const EditorCanvas = () => {
  const [elements] = useEditorStore(useShallow((state) => [state.elements]))

  useEffect(() => console.log('elements', elements), [elements])

  return (
    <m.section
      layout
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        ease: 'linear'
      }}
      className='h-full w-9/12 overflow-auto border-r border-t border-default-300 bg-zinc-800/10 p-5'>
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
