'use client'

import { memo, useEffect } from 'react'
import { m } from 'framer-motion'
import { useEditorStore } from '@/providers/user-store-provider'
import { ComponentType, EditorElement } from '@/model/web-builder'
import { addElementByType } from '@/lib/editor'
import Recursive from './recursive'
import { cn } from '@/lib/utils'

function Canvas(props: EditorElement) {
  const { device, handleAddElement } = useEditorStore((state) => state)
  const { id, content } = props

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation()

    const componentType = e.dataTransfer.getData('text')
    console.log(componentType)

    const value = addElementByType(componentType as ComponentType)
    if (typeof value === 'undefined') {
      return
    }
    handleAddElement(id, value)
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
          'relative z-20 mx-auto h-full rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500',
          deviceSize[device]
        )}>
        {(content as EditorElement[]).map((i) => (
          <Recursive key={i.id} {...i} />
        ))}
      </div>
    </>
  )
}

const EditorCanvas = () => {
  const { elements } = useEditorStore((state) => state)

  useEffect(() => console.log('elements', elements), [elements])

  return (
    <m.section
      layout
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        ease: 'linear'
      }}
      className='h-full w-4/5 overflow-auto border-r border-t border-default-300 bg-zinc-800/10 p-6'>
      {elements.map((item) => (
        <Canvas key={item.id} {...item} />
      ))}
    </m.section>
  )
}

export default memo(EditorCanvas)

const deviceSize = {
  Desktop: 'max-w-full',
  Tablet: 'max-w-4xl',
  Mobile: 'max-w-md'
}
