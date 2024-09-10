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

  const [device, onAddElement, onSelectElement] = useEditorStore(
    useShallow((state) => [state.device, state.onAddElement, state.onSelectElement])
  )

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation()

    const dragItem = e.dataTransfer.getData('text')

    if (isNaN(Number(dragItem))) {
      const value = addElementByType(dragItem as ComponentName)
      if (typeof value !== 'undefined') {
        onAddElement(id, value)
        onSelectElement(value)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // const handleClickBody = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   onSelectElement({
  //     id: '',
  //     name: null,
  //     styles: {},
  //     group: null,
  //     content: []
  //   })
  // }

  return (
    <>
      <div
        id={id}
        // onKeyDown={() => {}}
        // onClick={handleClickBody}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'relative mx-auto h-full overflow-auto rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500 dark:bg-zinc-900',
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
  const [elements, selectedElement, onDeleteElement] = useEditorStore(
    useShallow((state) => [state.elements, state.selectedElement, state.onDeleteElement])
  )

  return (
    <m.section
      layout
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        ease: 'linear'
      }}
      className='relative h-full w-9/12 border-r border-t border-default-300 bg-zinc-800/10 p-1'>
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
