'use client'

import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

const EditorToolbox = () => {
  return (
    <>
      <div className='min-h-10 w-full'></div>
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
        className='h-full w-3/4 rounded-sm border'
        style={{ backgroundColor: isOver ? 'darkkhaki' : '#fff' }}>
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

  return (
    <>
      <div className='h-full w-1/4 rounded-sm border'>
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
          Drag me
        </button>
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
