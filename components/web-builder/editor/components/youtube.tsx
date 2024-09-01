'use client'

import React from 'react'

import ReactPlayer from 'react-player/youtube'

import { cn } from '@/lib/utils'
import { RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function YouTube(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDragItemOrder } = useEditorStore(
    (state) => state
  )

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  return (
    <div
      className={cn('', liveMode ? 'p-0' : 'cursor-pointer rounded-sm border p-3', {
        'border-dashed': selectedElement.id === id,
        'border-primary-500 outline-none': selectedElement.id === id
      })}
      onClick={handleClick}
      role='button'
      onKeyDown={() => {}}
      tabIndex={0}
      style={styles}>
      <ReactPlayer
        url='https://youtu.be/5wvW7OvUyQY'
        height={'100%'}
        width={'100%'}
        controls
        volume={0.5}
        pip={false}
      />
    </div>
  )
}

{
  /* <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/5wvW7OvUyQY?si=pc02EHaT3EpbAXvj'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen></iframe> */
}
