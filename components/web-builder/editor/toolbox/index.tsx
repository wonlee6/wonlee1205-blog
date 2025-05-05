'use client'

import { addToast, Button, Tooltip } from '@heroui/react'
import { m } from 'framer-motion'
import {
  DoorOpen,
  InfoIcon,
  Monitor,
  PauseIcon,
  PlayIcon,
  Smartphone,
  TabletSmartphone
} from 'lucide-react'
import Link from 'next/link'
import { memo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { encryptFormData } from '@/helper/editor'
import { useEditorStore } from '@/providers/user-store-provider'

function EditorToolbox({ projectName, description }: { projectName: string; description: string }) {
  const [liveMode, device, elements, setDevice, setLiveMode] = useEditorStore(
    useShallow((state) => [
      state.liveMode,
      state.device,
      state.elements,
      state.setDevice,
      state.setLiveMode
    ])
  )
  const [saveLoading, setSaveLoading] = useState(false)

  const handleLiveMode = () => {
    setLiveMode()
  }

  const handleSave = async () => {
    setSaveLoading(true)
    const encryptedData = encryptFormData(JSON.stringify(elements))

    const response = await fetch('/api/web-builder/page', {
      method: 'PATCH',
      body: JSON.stringify({ data: encryptedData })
    })

    addToast({
      title: response.statusText,
      color: 'primary'
    })
    setSaveLoading(false)
  }

  return (
    <>
      <m.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        layout='preserve-aspect'
        transition={{ ease: 'easeInOut', type: 'spring' }}
        className='flex h-[4%] w-full items-center justify-between border-b border-default-300 px-4'>
        <div className='flex items-center gap-4'>
          <div className='border-r pr-2'>
            <Link href={'/web-builder/project'} prefetch passHref>
              <Button type='button' variant='light' size='sm' startContent={<DoorOpen />}>
                Back
              </Button>
            </Link>
          </div>
          <h2 className='select-none text-base'>{projectName}</h2>
          <Tooltip content={description} showArrow>
            <InfoIcon className='cursor-pointer' size={18} />
          </Tooltip>
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
          <Tooltip showArrow content='Live Mode'>
            <Button isIconOnly variant='light' size='sm' onClick={handleLiveMode}>
              {liveMode ? <PauseIcon /> : <PlayIcon />}
            </Button>
          </Tooltip>

          <Button
            variant='shadow'
            color='primary'
            size='sm'
            onClick={handleSave}
            isLoading={saveLoading}>
            Save
          </Button>
        </div>
      </m.div>
    </>
  )
}

export default memo(EditorToolbox)
