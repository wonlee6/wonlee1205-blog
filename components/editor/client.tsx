'use client'

import { ProjectData } from '@/model/web-builder'
import React, { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Editor from './index'

type Props = {
  data: ProjectData[]
}
export default function EditorClient(props: Props) {
  const [isDropped, setIsDropped] = useState(false)

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }

  return (
    <>
      <Editor>
        <Editor.Toolbox />
        <div className='flex size-full'>
          <DndContext onDragEnd={handleDragEnd}>
            <Editor.Canvas>Drag here</Editor.Canvas>
            <Editor.Attributes></Editor.Attributes>
          </DndContext>
        </div>
      </Editor>
    </>
  )
}
