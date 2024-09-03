'use client'

import React, { useRef, useState } from 'react'

import ReactPlayer from 'react-player/youtube'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function YouTube(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDragItemOrder, onUpdateElement } =
    useEditorStore((state) => state)

  const URLRef = useRef<HTMLInputElement | null>(null)

  const [url, setURL] = useState((content as ElementType).url ?? '')

  const handleClick = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.stopPropagation()

    onSelectElement({
      id,
      name,
      group,
      styles,
      content
    })
  }

  const handleSaveURL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url) {
      URLRef.current?.focus()
      return
    }

    onUpdateElement<string>('url', url)
  }

  const handleEditURL = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    onUpdateElement<string>('url', '')
  }

  return (
    <>
      {(content as ElementType).url ? (
        <ContextMenu>
          <ContextMenuTrigger className='cursor-context-menu'>
            <AspectRatio
              className={cn('', liveMode ? 'p-0' : 'cursor-pointer rounded-sm border p-3', {
                'border-dashed': selectedElement.id === id,
                'border-primary-500 outline-none': selectedElement.id === id
              })}
              ratio={16 / 9}
              style={styles}
              onClick={handleClick}>
              <ReactPlayer
                // url='https://youtu.be/5wvW7OvUyQY'
                url={url}
                height={'100%'}
                width={'100%'}
                controls
                volume={0.5}
                pip={false}
              />
            </AspectRatio>
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem onClick={handleEditURL}>Edit URL</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <form
          className={cn(
            'flex h-[300px] w-full items-center justify-center',
            liveMode ? 'p-0' : 'cursor-pointer rounded-sm border p-3',
            {
              'border-dashed': selectedElement.id === id,
              'border-primary-500 outline-none': selectedElement.id === id
            }
          )}
          onSubmit={handleSaveURL}
          onClick={handleClick}
          onKeyDown={() => {}}>
          <div className='flex w-96 flex-col gap-2'>
            <Label htmlFor='url'>YouTube URL</Label>
            <Input
              id='url'
              placeholder='Enter YouTube URL'
              ref={URLRef}
              autoComplete='off'
              onChange={(e) => setURL(e.target.value)}
            />
            <Button type='submit'>Save</Button>
          </div>
        </form>
      )}
    </>
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
