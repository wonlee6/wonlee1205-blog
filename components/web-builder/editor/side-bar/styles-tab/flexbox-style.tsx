import { memo, useState } from 'react'

import { Button, Input, Select, SelectItem, Tooltip } from '@heroui/react'
import {
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon
} from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'
import useUpdateElement from '@/hooks/useUpdateElement'
import { ComponentGroup } from '@/types/web-builder'

function FlexBoxStyle({
  selectedStyles,
  componentGroup
}: {
  selectedStyles: React.CSSProperties
  componentGroup: ComponentGroup
}) {
  const { handleBtnUpdateElement, handleInputUpdateElement } = useUpdateElement()

  const inputDebounce = useDebounce((e) => handleInputUpdateElement(e), 250)

  const [form, setForm] = useState({
    flexDirection: selectedStyles['flexDirection'] ?? 'column',
    justifyContent: selectedStyles['justifyContent'] ?? 'center',
    alignItems: selectedStyles['alignItems'] ?? 'center',
    gap: selectedStyles['gap'] ?? ''
  })

  const handleBtn = (key: string, value: string) => {
    handleBtnUpdateElement(key, value)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    inputDebounce(e)
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    inputDebounce(e)
  }

  const isDisable = componentGroup !== 'Structure'

  return (
    <>
      <div className='flex flex-col gap-4'>
        <span className='text-foreground-600'>Justify</span>

        <div className='grid grid-cols-5 border p-1'>
          <div className='border-r text-center'>
            <Tooltip content='start'>
              <Button
                color={form.justifyContent === 'start' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('justifyContent', 'start')}>
                <AlignHorizontalJustifyStartIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='center'>
              <Button
                color={form.justifyContent === 'center' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('justifyContent', 'center')}>
                <AlignHorizontalJustifyCenterIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='end'>
              <Button
                color={form.justifyContent === 'end' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('justifyContent', 'end')}>
                <AlignHorizontalJustifyEndIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='between'>
              <Button
                color={form.justifyContent === 'between' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('justifyContent', 'between')}>
                <AlignHorizontalSpaceBetweenIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='around'>
              <Button
                color={form.justifyContent === 'around' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('justifyContent', 'around')}>
                <AlignHorizontalSpaceAroundIcon />
              </Button>
            </Tooltip>
          </div>
        </div>

        <span className='text-foreground-600'>Align</span>

        <div className='grid grid-cols-3 border p-1'>
          <div className='border-r text-center'>
            <Tooltip content='start'>
              <Button
                color={form.alignItems === 'start' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('alignItems', 'start')}>
                <AlignVerticalJustifyStartIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='center'>
              <Button
                color={form.alignItems === 'center' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('alignItems', 'center')}>
                <AlignVerticalJustifyCenterIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='end'>
              <Button
                color={form.alignItems === 'end' ? 'primary' : 'default'}
                isIconOnly
                variant='light'
                isDisabled={isDisable}
                onClick={() => handleBtn('alignItems', 'end')}>
                <AlignVerticalJustifyEndIcon />
              </Button>
            </Tooltip>
          </div>
        </div>

        <span className='text-foreground-600'>Gap</span>

        <Input
          value={String(form.gap)}
          name='gap'
          radius='sm'
          autoComplete='off'
          placeholder='Gap'
          aria-label='gap attribute'
          isDisabled={isDisable}
          onChange={handleInputValue}
        />

        <span className='text-foreground-600'>Direction</span>

        <Select
          name='flexDirection'
          labelPlacement='outside'
          aria-label='flexDirection'
          selectedKeys={[form.flexDirection]}
          isDisabled={isDisable}
          onChange={handleSelectionChange}>
          {flexDirectionOptions.map((fontWeight) => (
            <SelectItem key={fontWeight.key}>{fontWeight.label}</SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}

export default memo(FlexBoxStyle)

const flexDirectionOptions = [
  { key: 'column', label: 'column' },
  { key: 'column-reverse', label: 'column-reverse' },
  { key: 'row', label: 'row' },
  { key: 'row-reverse', label: 'row-reverse' }
]
