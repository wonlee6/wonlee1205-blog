'use client'

import React, { memo, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Slider,
  SliderValue
} from '@nextui-org/react'
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd
} from 'lucide-react'
import useUpdateElement from '@/hooks/useUpdateElement'
import { useEditorStore } from '@/providers/user-store-provider'

function StylesTab() {
  const selectedElement = useEditorStore((state) => state.selectedElement)

  const { handleInputUpdateElement, handleBtnUpdateElement } = useUpdateElement()

  const [value, setValue] = useState<string>('')

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  const [opacity, setOpacity] = useState<SliderValue>(50)

  return (
    <Accordion
      key={selectedElement.id}
      selectionMode='multiple'
      variant='shadow'
      className='rounded-none'
      defaultExpandedKeys='all'>
      <AccordionItem
        key='1'
        aria-label='Typography'
        title='Typography'
        classNames={{ heading: 'font-bold', content: 'pb-4' }}>
        <div className='flex flex-col gap-3'>
          <span className='text-foreground-500'>Text Align</span>
          <div className='grid w-full grid-cols-4 rounded-lg border p-1'>
            <div className='border-r text-center'>
              <Button
                isIconOnly
                size='sm'
                variant='light'
                onClick={() => handleBtnUpdateElement('textAlign', 'left')}>
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

          <Select
            name='fontFamily'
            label='Font Family'
            labelPlacement='outside'
            selectedKeys={[value]}
            onChange={handleSelectionChange}>
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Divider />

          <Input
            value={String(selectedElement.styles['color'] ?? '')}
            radius='sm'
            label='color'
            name='color'
            labelPlacement='outside'
            onChange={handleInputUpdateElement}
          />

          <Divider />

          <div className='flex gap-2'>
            <Select
              label='Select a weight'
              className='w-3/5'
              labelPlacement='outside'
              selectedKeys={[value]}
              onChange={handleSelectionChange}>
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Input
              className='w-2/5'
              radius='sm'
              label='font-size'
              name='fontSize'
              value={String(selectedElement.styles['fontSize'] ?? '')}
              onChange={handleInputUpdateElement}
              labelPlacement='outside'
            />
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        key='2'
        aria-label='Dimensions'
        title='Dimensions'
        classNames={{ heading: 'font-bold' }}>
        <div className='flex flex-col gap-3 pb-3'>
          <div className='flex gap-2'>
            <Input
              className='w-1/2'
              value={String(selectedElement.styles['height'] ?? '')}
              name='height'
              radius='sm'
              onChange={handleInputUpdateElement}
              maxLength={20}
              autoComplete='off'
              labelPlacement='outside'
              label='height'
            />

            <Input
              className='w-1/2'
              value={String(selectedElement.styles['width'] ?? '')}
              name='width'
              radius='sm'
              onChange={handleInputUpdateElement}
              maxLength={20}
              autoComplete='off'
              labelPlacement='outside'
              label='width'
            />
          </div>

          <Divider />

          <h3 className='text-base font-medium'>Margin px</h3>

          <div className='grid h-44 grid-cols-3 border'>
            <div className='flex items-center'>
              <div className='flex p-1'>
                <Input size='sm' label='Left' radius='sm' />
              </div>
            </div>
            <div className='flex flex-col justify-between px-1'>
              <div className='flex p-1'>
                <Input size='sm' label='Top' radius='sm' />
              </div>
              <div className='flex min-h-12 items-center justify-center border'>
                <span className='text-sm text-foreground-400'>component</span>
              </div>
              <div className='flex p-1'>
                <Input size='sm' label='Bottom' radius='sm' />
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex p-1'>
                <Input size='sm' label='Right' radius='sm' />
              </div>
            </div>
          </div>

          <h3 className='text-base font-medium'>Padding px</h3>

          <div className='grid h-44 grid-cols-3 border'>
            <div className='flex items-center'>
              <div className='flex p-1'>
                <Input size='sm' label='Left' radius='sm' />
              </div>
            </div>
            <div className='flex flex-col justify-between px-1'>
              <div className='flex p-1'>
                <Input size='sm' label='Top' radius='sm' />
              </div>
              <div className='flex min-h-12 items-center justify-center border'>
                <span className='text-sm text-foreground-400'>component</span>
              </div>
              <div className='flex p-1'>
                <Input size='sm' label='Bottom' radius='sm' />
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex p-1'>
                <Input size='sm' label='Right' radius='sm' />
              </div>
            </div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem
        key='3'
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
        key='4'
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
  )
}

export default memo(StylesTab)

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
