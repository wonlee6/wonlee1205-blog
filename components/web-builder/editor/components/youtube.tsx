'use client'

import React, { useRef, useState } from 'react'

import { Checkbox, Divider } from '@nextui-org/react'
import { Settings, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ElementType, RecursiveComponent } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'
import youtubeErrorImg from '@/public/images/youtube-error.webp'

export default function YouTube(props: RecursiveComponent) {
  const { content, name, id, styles, group, index, parentId } = props

  const { liveMode, selectedElement, onSelectElement, onDeleteElement, onUpdateContentInElement } =
    useEditorStore((state) => state)

  const URLRef = useRef<HTMLInputElement | null>(null)

  const [url, setURL] = useState((content as ElementType).url)
  const [isMute, setIsMute] = useState((content as ElementType).mute)
  const [isAutoplay, setIsAutoplay] = useState((content as ElementType).autoplay)
  const [isLoop, setIsLoop] = useState((content as ElementType).loop)
  const [showPlayerControls, setShowPlayerControls] = useState(
    (content as ElementType).showControls
  )

  const [showEdit, setShowEdit] = useState(true)

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
    setShowEdit(false)
    setURL(url)
    onUpdateContentInElement({ url })
  }

  const handleDeleteElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onDeleteElement(id)
  }

  const [isError, setIsError] = useState(false)

  const isFirstElementInBody = index === 0 && parentId === '___body'

  return (
    <div className='relative'>
      {showEdit ? (
        <>
          {liveMode ? (
            <>
              <Image
                className='m-auto'
                src={youtubeErrorImg}
                alt='youtube error'
                loading='lazy'
                width={500}
                style={{ objectFit: 'cover' }}
              />
            </>
          ) : (
            <form
              className={cn(
                'flex h-[350px] w-full items-center justify-center',
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
                <Checkbox isSelected={isMute} onValueChange={setIsMute}>
                  Mute
                </Checkbox>
                <Checkbox isSelected={isLoop} onValueChange={setIsLoop}>
                  Loop
                </Checkbox>
                <Checkbox isSelected={isAutoplay} onValueChange={setIsAutoplay}>
                  Autoplay
                </Checkbox>
                <Checkbox isSelected={showPlayerControls} onValueChange={setShowPlayerControls}>
                  Show player controls
                </Checkbox>
                <Divider className='my-2' />
                <Button type='submit'>Save</Button>
              </div>
            </form>
          )}
        </>
      ) : (
        <AspectRatio
          className={cn('relative', liveMode ? 'p-0' : 'cursor-pointer rounded-sm border p-1', {
            'border-dashed': selectedElement.id === id,
            'border-primary-500 outline-none': selectedElement.id === id
          })}
          ratio={16 / 9}
          style={styles}
          onClick={handleClick}>
          {isError ? (
            <div className='flex flex-col items-center justify-center gap-3'>
              <span className='text-danger-500'>The URL address does not exist.</span>
              <Button
                onClick={() => {
                  setShowEdit(true)
                  setIsError(false)
                }}>
                Please try again
              </Button>
            </div>
          ) : (
            <ReactPlayer
              // url='https://youtu.be/5wvW7OvUyQY'
              url={url}
              height={'100%'}
              width={'100%'}
              controls={showPlayerControls}
              volume={0.5}
              pip={false}
              loop={isLoop}
              muted={isMute}
              playing={isAutoplay}
              onError={() => {
                setIsError(true)
                onUpdateContentInElement({ url: '' })
              }}
            />
          )}
        </AspectRatio>
      )}

      {!liveMode && selectedElement.id === id && (
        <>
          <Badge
            className={cn(
              'absolute left-0 cursor-pointer gap-2 rounded-none bg-primary-500 hover:bg-primary-400',
              isFirstElementInBody
                ? 'bottom-0 translate-y-full rounded-b-lg'
                : '-top-6 rounded-t-lg'
            )}
            variant='default'
            onClick={() => setShowEdit(true)}>
            {name}
            <Settings size={15} />
          </Badge>

          <Badge
            onClick={handleDeleteElement}
            className={cn(
              'absolute right-0 cursor-pointer gap-1 rounded-none',
              isFirstElementInBody
                ? 'bottom-0 translate-y-full rounded-b-lg'
                : '-top-6 rounded-t-lg'
            )}
            variant='destructive'>
            Delete
            <Trash2Icon size={16} />
          </Badge>
        </>
      )}
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
