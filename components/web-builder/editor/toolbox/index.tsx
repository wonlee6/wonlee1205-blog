import { memo } from 'react'
import { Button } from '@nextui-org/react'
import { DoorOpen, Monitor, Play, Smartphone, TabletSmartphone } from 'lucide-react'

const EditorToolbox = () => {
  return (
    <>
      <div className='flex min-h-14 w-full items-center justify-between border-b border-default-300 px-4'>
        <div className='flex items-center gap-4'>
          <Button variant='light' startContent={<DoorOpen />}>
            Back
          </Button>
          <div className='flex flex-col gap-1'>
            <h2 className='text-base'>title</h2>
            <span className='text-sm text-foreground-500'>description</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Button isIconOnly variant='light'>
            <Monitor />
          </Button>
          <Button isIconOnly variant='light'>
            <TabletSmartphone />
          </Button>
          <Button isIconOnly variant='light'>
            <Smartphone />
          </Button>
        </div>
        <div className='flex items-center gap-4'>
          <Button isIconOnly variant='light'>
            <Play />
          </Button>
          <Button variant='shadow' color='primary'>
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default memo(EditorToolbox)
