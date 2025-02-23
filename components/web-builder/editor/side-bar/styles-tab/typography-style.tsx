import { memo, useState } from 'react'

import { Button, Divider, Input, Select, SelectItem, Tooltip } from '@heroui/react'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'
import useUpdateElement from '@/hooks/useUpdateElement'

function TypographyStyle({ selectedStyles }: { selectedStyles: React.CSSProperties }) {
  const { handleInputUpdateElement, handleBtnUpdateElement } = useUpdateElement()

  const [form, setForm] = useState({
    textAlign: selectedStyles['textAlign'] ?? 'left',
    fontSize: selectedStyles['fontSize'] ?? '',
    fontWeight: selectedStyles['fontWeight'] ?? '',
    fontFamily: selectedStyles['fontFamily'] ?? '',
    paddingLeft: selectedStyles['paddingLeft'] ?? '',
    color: selectedStyles['color'] ?? '#000000',
    lineHeight: selectedStyles['lineHeight'] ?? ''
  })

  const handleTextAlign = (align: string) => {
    handleBtnUpdateElement('textAlign', align)
    setForm((prev) => ({ ...prev, textAlign: align as any }))
  }

  const inputDebounce = useDebounce((e) => handleInputUpdateElement(e), 250)

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    inputDebounce(e)
  }

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <div className='flex flex-col gap-3'>
        <span className='text-foreground-500'>Text Align</span>
        <div className='grid w-full grid-cols-4 rounded-lg border p-1'>
          <div className='border-r text-center'>
            <Tooltip content='left'>
              <Button
                color={form.textAlign === 'left' ? 'primary' : 'default'}
                isIconOnly
                size='sm'
                variant='light'
                onClick={() => handleTextAlign('left')}>
                <AlignLeftIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='right'>
              <Button
                color={form.textAlign === 'right' ? 'primary' : 'default'}
                isIconOnly
                size='sm'
                variant='light'
                onClick={() => handleTextAlign('right')}>
                <AlignRightIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='border-r text-center'>
            <Tooltip content='justify'>
              <Button
                color={form.textAlign === 'justify' ? 'primary' : 'default'}
                isIconOnly
                size='sm'
                variant='light'
                onClick={() => handleTextAlign('justify')}>
                <AlignJustifyIcon />
              </Button>
            </Tooltip>
          </div>
          <div className='text-center'>
            <Tooltip content='center'>
              <Button
                color={form.textAlign === 'center' ? 'primary' : 'default'}
                isIconOnly
                size='sm'
                variant='light'
                onClick={() => handleTextAlign('center')}>
                <AlignCenterIcon />
              </Button>
            </Tooltip>
          </div>
        </div>

        <Divider className='mx-auto my-1 w-1/2' />

        <span className='text-foreground-600'>Font</span>
        <Input
          value={String(form.fontSize)}
          radius='sm'
          name='fontSize'
          onChange={handleInputValue}
          autoComplete='off'
          label='Font Size'
          labelPlacement='outside'
        />
        <Select
          name='fontWeight'
          label='Font Weight'
          labelPlacement='outside'
          selectedKeys={[String(form.fontWeight)]}
          onChange={handleSelectionChange}>
          {fontWeightOptions.map((fontWeight) => (
            <SelectItem key={fontWeight.key}>{fontWeight.label}</SelectItem>
          ))}
        </Select>
        <Select
          name='fontFamily'
          label='Font Family'
          labelPlacement='outside'
          selectedKeys={[form.fontFamily]}
          onChange={handleSelectionChange}>
          {fontFamilyOptions.map((fontFamily) => (
            <SelectItem key={fontFamily.key}>{fontFamily.label}</SelectItem>
          ))}
        </Select>
        <Input
          value={String(form.lineHeight)}
          radius='sm'
          name='lineHeight'
          onChange={handleInputValue}
          autoComplete='off'
          label='line-Height'
          labelPlacement='outside'
        />

        <Divider className='mx-auto my-1 w-1/2' />

        <span className='text-foreground-600'>Color</span>
        <div className='flex gap-3'>
          <input
            type='color'
            name='color'
            className='m-0 h-auto w-1/5 bg-none p-0'
            value={form.color}
            onChange={handleColor}
          />
          <Input
            className='w-4/5'
            value={form.color}
            radius='sm'
            name='color'
            onChange={handleInputValue}
            autoComplete='off'
          />
        </div>
      </div>
    </>
  )
}

export default memo(TypographyStyle)

const fontWeightOptions = [
  { key: '100', label: '100' },
  { key: '200', label: '200' },
  { key: '300', label: '300' },
  { key: '400', label: '400' },
  { key: '500', label: '500' },
  { key: '600', label: '600' },
  { key: '700', label: '700' },
  { key: '800', label: '800' },
  { key: '900', label: '900' },
  { key: 'bold', label: 'bold' },
  { key: 'bolder', label: 'bolder' },
  { key: 'lighter', label: 'lighter' },
  { key: 'normal', label: 'normal' }
]

const fontFamilyOptions = [
  { key: 'auto', label: 'auto' },
  { key: 'cursive', label: 'cursive' },
  { key: 'emoji', label: 'emoji' },
  { key: 'fangsong', label: 'fangsong' },
  { key: 'fantasy', label: 'fantasy' },
  { key: 'math', label: 'math' },
  { key: 'monospace', label: 'monospace' },
  { key: 'none', label: 'none' },
  { key: 'sans-serif', label: 'sans-serif' },
  { key: 'serif', label: 'serif' },
  { key: 'system-ui', label: 'system-ui' },
  { key: 'ui-monospace', label: 'ui-monospace' },
  { key: 'ui-rounded', label: 'ui-rounded' },
  { key: 'ui-sans-serif', label: 'ui-sans-serif' },
  { key: 'ui-serif', label: 'ui-serif' },
  { key: '-webkit-body', label: '-webkit-body' },
  { key: 'inherit', label: 'inherit' },
  { key: 'initial', label: 'initial' },
  { key: 'revert', label: 'revert' },
  { key: 'revert-layer', label: 'revert-layer' },
  { key: 'unset', label: 'unset' }
]
