'use client'

import React from 'react'

import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { SettingsIcon, Trash2Icon } from 'lucide-react'

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
  if (!isShowBadge) return null

  return (
    <PopoverTrigger
      className={cn('absolute z-20', isFirstElementInBody ? 'bottom-0 left-1' : '-top-8 left-1')}>
      <Button
        className={cn(
          'gap-2 rounded-none',
          isFirstElementInBody ? 'translate-y-full rounded-b-lg' : 'rounded-t-lg'
        )}
        size='sm'
        variant='solid'
        color='primary'
        endContent={isShowBadgeIcon && <SettingsIcon size={15} />}>
        {name || 'Empty Name'}
      </Button>
    </PopoverTrigger>
  )
}

type ContentProps = {
  title: string
  onDeleteElement: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDeleteElementByKeyboard: (e: React.KeyboardEvent<HTMLButtonElement>) => void
}

function Content({
  children,
  title,
  onDeleteElement,
  onDeleteElementByKeyboard
}: React.PropsWithChildren<ContentProps>) {
  return (
    <PopoverContent className='w-[300px]'>
      {(titleProps) => (
        <div className='grid w-full gap-3 p-3'>
          <div className='space-y-2'>
            <h3
              className='select-none text-base font-semibold'
              {...titleProps}>{`${title} Setting`}</h3>
          </div>
          <Divider />
          <div className='grid gap-2'>{children}</div>
          <Divider />
          <Button
            onClick={onDeleteElement}
            onKeyDown={onDeleteElementByKeyboard}
            variant='light'
            color='danger'
            startContent={<Trash2Icon size={17} />}>{`Delete ${title}`}</Button>
        </div>
      )}
    </PopoverContent>
  )
}

type Props = {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode[]
  element: Element | undefined
}

function SettingPopover2(props: Props) {
  return (
    <Popover
      classNames={{
        trigger: 'data-[hover=true]:opacity-100 aria-[expanded=true]:opacity-100'
      }}
      shouldCloseOnInteractOutside={() => true}
      portalContainer={props.element}
      onOpenChange={props.onOpenChange}
      // containerPadding={52}
      // crossOffset={1}
      radius='sm'
      placement='bottom'
      // showArrow
      backdrop={undefined}
      offset={0}>
      {props.children}
    </Popover>
  )
}

SettingPopover2.Trigger = Trigger
SettingPopover2.Content = Content
export default SettingPopover2
