'use client'

import { m } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

import Recursive from './recursive'
import { addElementByType } from '@/helper/editor.helper'
import { cn } from '@/lib/utils'
import { ComponentName, EditorElement, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

const Canvas = (props: RecursiveComponent<'Body'>) => {
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
        // onClick={handleClickBody}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          'relative mx-auto h-auto rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500 dark:bg-zinc-900',
          deviceSize[device]
        )}>
        {content.map((i, index) => (
          <Recursive key={i.id} {...i} index={index} parentId={id} />
        ))}
      </div>
    </>
  )
}

Canvas.displayName = 'Canvas'

const EditorCanvas = () => {
  const [elements] = useEditorStore(useShallow((state) => [state.elements]))

  return (
    <m.section
      layout
      initial={{ x: 0 }}
      animate={{
        x: 0
      }}
      className={
        'size-full flex-1 overflow-y-auto border-r border-t border-default-300 bg-[#f6f7f9] p-2 scrollbar-hide'
      }>
      {(elements as EditorElement<'Body'>[]).map((item, index) => (
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
