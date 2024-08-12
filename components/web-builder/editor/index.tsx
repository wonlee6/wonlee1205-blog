'use client'

import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Slider,
  SliderValue,
  Tab,
  Tabs
} from '@nextui-org/react'
import {
  Plus,
  Settings,
  Play,
  Monitor,
  Smartphone,
  TabletSmartphone,
  DoorOpen,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignCenterVertical,
  AlignCenterHorizontalIcon,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd
} from 'lucide-react'

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

const EditorCanvas = ({ children }: { children?: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })

  return (
    <>
      <div
        ref={setNodeRef}
        className='relative h-full w-4/5 overflow-auto border-r border-t border-default-300 p-1'>
        {children}
      </div>
    </>
  )
}

const EditorAttributes = ({ children }: { children?: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform)
      }
    : undefined

  const [value, setValue] = React.useState<string>('')

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  const [opacity, setOpacity] = React.useState<SliderValue>(50)

  return (
    <>
      <div className='flex h-full w-1/5 border-l border-t border-default-300'>
        <div className='flex h-full w-[85%] flex-col overflow-y-auto border-r border-default-300 p-3'>
          <Tabs aria-label='Options' radius='none'>
            <Tab key='styles' title='Styles' className='flex h-full flex-col gap-4 overflow-y-auto'>
              <div className='flex flex-col gap-2 border p-4 shadow-md'>
                <h3 className='text-lg font-bold'>Styles</h3>
                <span className='text-sm text-foreground-500'>
                  Show your creativity! You can customize every component as you like.
                </span>
              </div>

              <Accordion
                selectionMode='multiple'
                variant='shadow'
                className='rounded-none'
                defaultExpandedKeys='all'>
                <AccordionItem
                  key='1'
                  aria-label='Custom'
                  title='Custom'
                  classNames={{ heading: 'font-bold', content: 'pb-4' }}>
                  <span className='text-sm text-foreground-500'>
                    Show your creativity! You can customize every component as you like.
                  </span>
                </AccordionItem>

                <AccordionItem
                  key='2'
                  aria-label='Typography'
                  title='Typography'
                  classNames={{ heading: 'font-bold', content: 'pb-4' }}>
                  <div className='flex flex-col gap-3'>
                    <span className='text-foreground-500'>Text Align</span>
                    <div className='grid w-full grid-cols-4 rounded-lg border p-1'>
                      <div className='border-r text-center'>
                        <Button isIconOnly size='sm' variant='light'>
                          <AlignLeft />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly size='sm' variant='light'>
                          <AlignRight />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly size='sm' variant='light'>
                          <AlignJustify />
                        </Button>
                      </div>
                      <div className='text-center'>
                        <Button isIconOnly size='sm' variant='light'>
                          <AlignCenter />
                        </Button>
                      </div>
                    </div>

                    <Divider />

                    <span className='text-foreground-500'>Font Family</span>
                    <Input radius='sm' />

                    <Divider />

                    <span className='text-foreground-500'>Color</span>
                    <Input radius='sm' />
                    {/* <input type='color' /> */}

                    <Divider />

                    <div className='flex gap-2'>
                      <div className='flex w-3/5 flex-col'>
                        <span className='text-foreground-500'>Weight</span>
                        <Select
                          label='Select a weight'
                          className='max-w-xs'
                          size='sm'
                          selectedKeys={[value]}
                          onChange={handleSelectionChange}>
                          {animals.map((animal) => (
                            <SelectItem key={animal.key}>{animal.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className='flex w-2/5 flex-col'>
                        <span className='text-foreground-500'>Size</span>
                        <Input placeholder='px' size='lg' radius='sm' />
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  key='3'
                  aria-label='Dimensions'
                  title='Dimensions'
                  classNames={{ heading: 'font-bold' }}>
                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Height</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Width</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                    </div>

                    <Divider />

                    <h3 className='text-base font-medium'>Margin px</h3>

                    <div className='flex gap-2'>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>top</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Bottm</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Left</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Right</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                    </div>

                    <Divider />

                    <h3 className='text-base font-medium'>Padding px</h3>

                    <div className='flex gap-2'>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>top</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Bottm</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Left</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                      <div className='flex w-1/2 flex-col'>
                        <span className='text-foreground-600'>Right</span>
                        <Input radius='sm' placeholder='px' />
                      </div>
                    </div>

                    <div className='relative flex items-center justify-center border bg-amber-500/50 py-10'>
                      <p className='absolute left-2 top-1'>margin</p>
                      <div className='relative flex items-center justify-center border bg-green-400/40 p-10'>
                        <p className='absolute left-1 top-1'>padding</p>
                        <div className='border bg-sky-600/50 p-1'>Component</div>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  key='4'
                  aria-label='Decorations'
                  title='Decorations'
                  classNames={{ heading: 'font-bold' }}>
                  <div className='flex flex-col gap-4'>
                    <Slider
                      label='Opacity'
                      color='foreground'
                      step={0.05}
                      maxValue={1}
                      minValue={0}
                      defaultValue={opacity}
                      className='max-w-md'
                      showOutline
                      showTooltip
                      onChangeEnd={setOpacity}
                      marks={[
                        {
                          value: 0.2,
                          label: '0.2'
                        },
                        {
                          value: 0.5,
                          label: '0.5'
                        },
                        {
                          value: 0.8,
                          label: '0.8'
                        }
                      ]}
                    />

                    <Slider
                      label='Border Radius'
                      color='foreground'
                      step={1}
                      maxValue={30}
                      minValue={0}
                      defaultValue={0}
                      className='max-w-md'
                      showOutline
                      showTooltip
                      onChangeEnd={setOpacity}
                    />

                    <span className='text-foreground-600'>Background color</span>
                    <div className='flex gap-3'>
                      <input type='color' className='h-auto w-1/5' />
                      <Input radius='sm' className='w-4/5' />
                    </div>

                    <span className='text-foreground-600'>Background Image</span>
                  </div>
                </AccordionItem>

                <AccordionItem
                  key='5'
                  aria-label='Flexbox'
                  title='Flexbox'
                  classNames={{ heading: 'font-bold' }}>
                  <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-5 border p-1'>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignHorizontalJustifyStart />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignHorizontalJustifyEnd />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignHorizontalJustifyCenter />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignHorizontalSpaceBetween />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignHorizontalSpaceAround />
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 border p-1'>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignVerticalJustifyStart />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignVerticalJustifyCenter />
                        </Button>
                      </div>
                      <div className='border-r text-center'>
                        <Button isIconOnly variant='light'>
                          <AlignVerticalJustifyEnd />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </Tab>

            <Tab key='photos' title='Photos'>
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        <div className='flex w-[15%] flex-col items-center gap-4 border-l border-default-300 py-1'>
          <Button isIconOnly variant='light'>
            <Settings />
          </Button>
          <Button isIconOnly variant='light'>
            <Plus />
          </Button>
        </div>
      </div>
    </>
  )
}

const Editor = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex size-full h-auto flex-col'>{children}</div>
    </>
  )
}

Editor.Toolbox = EditorToolbox
Editor.Canvas = EditorCanvas
Editor.Attributes = EditorAttributes
export default Editor

export const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' }
]
