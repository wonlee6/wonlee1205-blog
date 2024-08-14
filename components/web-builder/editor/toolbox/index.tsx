import { memo, useEffect, useState } from 'react'
import { Button, Tooltip } from '@nextui-org/react'
import { DoorOpen, Monitor, Play, Smartphone, TabletSmartphone } from 'lucide-react'
import { useEditorStore } from '@/providers/user-store-provider'
import { m } from 'framer-motion'

function EditorToolbox() {
  const { device, setDevice } = useEditorStore((state) => state)

  return (
    <>
      <m.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        layout
        transition={{ ease: 'easeInOut', type: 'spring' }}
        className='flex min-h-14 w-full items-center justify-between border-b border-default-300 px-4'>
        <div className='flex items-center gap-4'>
          <Button variant='light' onClick={() => {}} startContent={<DoorOpen />}>
            Back
          </Button>
          <div className='flex flex-col gap-1'>
            <h2 className='text-base'>title</h2>
            <span className='text-sm text-foreground-500'>description</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Tooltip content='Desktop'>
            <Button
              isIconOnly
              variant='light'
              color={device === 'Desktop' ? 'primary' : 'default'}
              onClick={() => setDevice('Desktop')}>
              <Monitor />
            </Button>
          </Tooltip>
          <Tooltip content='Tablet'>
            <Button
              isIconOnly
              variant='light'
              color={device === 'Tablet' ? 'primary' : 'default'}
              onClick={() => setDevice('Tablet')}>
              <TabletSmartphone />
            </Button>
          </Tooltip>
          <Tooltip content='Mobile'>
            <Button
              isIconOnly
              variant='light'
              color={device === 'Mobile' ? 'primary' : 'default'}
              onClick={() => setDevice('Mobile')}>
              <Smartphone />
            </Button>
          </Tooltip>
        </div>
        <div className='flex items-center gap-4'>
          <Tooltip content='Play'>
            <Button isIconOnly variant='light'>
              <Play />
            </Button>
          </Tooltip>

          <Button variant='shadow' color='primary'>
            Save
          </Button>
        </div>
      </m.div>
    </>
  )
}

export default memo(EditorToolbox)
