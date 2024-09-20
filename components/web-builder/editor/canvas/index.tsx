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
    // console.log('dragItem', dragItem)
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
          'relative mx-auto flex h-full flex-col overflow-auto rounded border border-foreground-300 bg-white p-1 shadow-md transition-all duration-500 scrollbar-hide dark:bg-zinc-900',
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
  const [liveMode, elements] = useEditorStore(
    useShallow((state) => [state.liveMode, state.elements])
  )

  return (
    <m.section
      layout
      initial={{ x: 0, width: '100%', height: '100%' }}
      animate={{
        x: 0,
        width: liveMode ? '100%' : 'auto',
        height: liveMode ? '100%' : 'auto'
      }}
      className={cn('h-full flex-1 border-r border-t border-default-300 bg-[#f6f7f9] p-1')}>
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
