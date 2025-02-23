'use client'

import React from 'react'

import { Divider } from '@heroui/react'
import { SettingsIcon, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type TriggerProps = {
  name: string
  isFirstElementInBody: boolean
  isShowBadge: boolean
  isShowBadgeIcon?: boolean
}

function Trigger({
  isFirstElementInBody,
  isShowBadge,
  name,
  isShowBadgeIcon = true
}: TriggerProps) {
  return (
    <PopoverTrigger
      onClick={(e) => e.stopPropagation()}
      className={cn('absolute z-10', isFirstElementInBody ? 'bottom-0 left-1' : '-top-6 left-1')}>
      {isShowBadge ? (
        <Badge
          className={cn(
            'cursor-pointer gap-2 rounded-none bg-primary-500 hover:bg-primary-400',
            isFirstElementInBody ? 'translate-y-full rounded-b-lg' : 'rounded-t-lg'
          )}
          variant='default'>
          {name || 'Empty Name'}
          {isShowBadgeIcon && <SettingsIcon size={15} />}
        </Badge>
      ) : null}
    </PopoverTrigger>
  )
}

type ContentProps = {
  title: string
  onDeleteElement: (e: React.MouseEvent<HTMLDivElement>) => void
  onDeleteElementByKeyboard: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

function Content({
  children,
  title,
  onDeleteElement,
  onDeleteElementByKeyboard
}: React.PropsWithChildren<ContentProps>) {
  return (
    <PopoverContent align='start' sideOffset={0} onClick={(e) => e.stopPropagation()}>
      <div className='grid gap-3'>
        <div className='space-y-2'>
          <h4 className='font-medium leading-none'>{`${title} Setting`}</h4>
        </div>
        <Divider />
        <div className='grid gap-2'>{children}</div>
        <Divider />
        <div
          onClick={onDeleteElement}
          aria-label='Delete Button'
          onKeyDown={onDeleteElementByKeyboard}
          role='button'
          tabIndex={0}
          className='flex cursor-pointer items-center gap-3 rounded-md p-1 text-danger-500 transition-all hover:bg-danger-500 hover:text-white'>
          <Trash2Icon size={15} />
          <span>{`Delete ${title}`}</span>
        </div>
      </div>
    </PopoverContent>
  )
}

type Props = {
  onOpenChange?: (open: boolean) => void
}

function SettingPopover(props: React.PropsWithChildren<Props>) {
  return (
    <Popover modal onOpenChange={props.onOpenChange}>
      {props.children}
    </Popover>
  )
}

SettingPopover.Trigger = Trigger
SettingPopover.Content = Content
export default SettingPopover
