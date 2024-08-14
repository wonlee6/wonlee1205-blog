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
        layout='preserve-aspect'
        transition={{ ease: 'easeInOut', type: 'spring' }}
        className='flex h-[3%] w-full items-center justify-between border-b border-default-300 px-4'>
        <div className='flex items-center gap-4'>
          <div className='border-r pr-2'>
            <Button variant='light' size='sm' onClick={() => {}} startContent={<DoorOpen />}>
              Back
            </Button>
          </div>
          <h2 className='text-base'>title</h2>
        </div>
        <div className='flex items-center gap-4'>
          <Tooltip content='Desktop'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              color={device === 'Desktop' ? 'primary' : 'default'}
              onClick={() => setDevice('Desktop')}>
              <Monitor />
            </Button>
          </Tooltip>
          <Tooltip content='Tablet'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              color={device === 'Tablet' ? 'primary' : 'default'}
              onClick={() => setDevice('Tablet')}>
              <TabletSmartphone />
            </Button>
          </Tooltip>
          <Tooltip content='Mobile'>
            <Button
              isIconOnly
              size='sm'
              variant='light'
              color={device === 'Mobile' ? 'primary' : 'default'}
              onClick={() => setDevice('Mobile')}>
              <Smartphone />
            </Button>
          </Tooltip>
        </div>
        <div className='flex items-center gap-4'>
          <Tooltip content='Play'>
            <Button isIconOnly variant='light' size='sm'>
              <Play />
            </Button>
          </Tooltip>

          <Button variant='shadow' color='primary' size='sm'>
            Save
          </Button>
        </div>
      </m.div>
    </>
  )
}

export default memo(EditorToolbox)
