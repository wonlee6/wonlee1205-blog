'use client'

import React, { useMemo, useRef, useState } from 'react'

import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tooltip
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

import { useDebounce } from '@/hooks/useDebounce'
import useUpdateElement from '@/hooks/useUpdateElement'
import { ComponentGroup } from '@/model/web-builder'

const Typography = ({ selectedStyles }: { selectedStyles: React.CSSProperties }) => {
  const { handleInputUpdateElement, handleBtnUpdateElement } = useUpdateElement()

  const [form, setForm] = useState({
    textAlign: selectedStyles['textAlign'] ?? 'left',
    fontSize: selectedStyles['fontSize'] ?? '',
    fontWeight: selectedStyles['fontWeight'] ?? '',
    fontFamily: selectedStyles['fontFamily'] ?? '',
    paddingLeft: selectedStyles['paddingLeft'] ?? '',
    color: selectedStyles['color'] ?? '#000000'
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
                <AlignLeft />
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
                <AlignRight />
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
                <AlignJustify />
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
                <AlignCenter />
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
          selectedKeys={[form.fontWeight]}
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

const Dimensions = ({ selectedStyles }: { selectedStyles: React.CSSProperties }) => {
  const { handleInputUpdateElement } = useUpdateElement()

  const [form, setForm] = useState({
    height: selectedStyles['height'] ?? '',
    width: selectedStyles['width'] ?? '',
    marginLeft: selectedStyles['marginLeft'] ?? '',
    marginTop: selectedStyles['marginTop'] ?? '',
    marginBottom: selectedStyles['marginBottom'] ?? '',
    marginRight: selectedStyles['marginRight'] ?? '',
    paddingLeft: selectedStyles['paddingLeft'] ?? '',
    paddingTop: selectedStyles['paddingTop'] ?? '',
    paddingBottom: selectedStyles['paddingBottom'] ?? '',
    paddingRight: selectedStyles['paddingRight'] ?? ''
  })

  const inputDebounce = useDebounce((e) => handleInputUpdateElement(e), 250)

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    inputDebounce(e)
  }

  return (
    <>
      <div className='flex flex-col gap-3 pb-3'>
        <div className='flex gap-2'>
          <Input
            className='w-1/2'
            value={String(form.height)}
            name='height'
            radius='sm'
            onChange={handleInputValue}
            maxLength={20}
            autoComplete='off'
            labelPlacement='outside'
            label='height'
          />

          <Input
            className='w-1/2'
            value={String(form.width)}
            name='width'
            radius='sm'
            onChange={handleInputValue}
            maxLength={20}
            autoComplete='off'
            labelPlacement='outside'
            label='width'
          />
        </div>

        <Divider className='mx-auto my-1 w-1/2' />

        <h3 className='text-base font-medium'>Margin</h3>

        <div className='grid h-44 grid-cols-3 border'>
          <div className='flex items-center'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Left'
                radius='sm'
                name='marginLeft'
                value={String(form.marginLeft)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='flex flex-col justify-between px-1'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Top'
                radius='sm'
                name='marginTop'
                value={String(form.marginTop)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
            <div className='flex min-h-12 items-center justify-center border'>
              <span className='truncate text-sm text-foreground-400'>component</span>
            </div>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Bottom'
                radius='sm'
                name='marginBottom'
                value={String(form.marginBottom)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Right'
                radius='sm'
                name='marginRight'
                value={String(form.marginRight)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
        </div>

        <h3 className='text-base font-medium'>Padding</h3>

        <div className='grid h-44 grid-cols-3 border'>
          <div className='flex items-center'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Left'
                radius='sm'
                name='paddingLeft'
                value={String(form.paddingLeft)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='flex flex-col justify-between px-1'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Top'
                radius='sm'
                name='paddingTop'
                value={String(form.paddingTop)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
            <div className='flex min-h-12 items-center justify-center border'>
              <span className='truncate text-sm text-foreground-400'>component</span>
            </div>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Bottom'
                radius='sm'
                name='paddingBottom'
                value={String(form.paddingBottom)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex p-1'>
              <Input
                size='sm'
                label='Right'
                radius='sm'
                name='paddingRight'
                value={String(form.paddingRight)}
                onChange={handleInputValue}
                autoComplete='off'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Decorations = ({ selectedStyles }: { selectedStyles: React.CSSProperties }) => {
  const { handleInputUpdateElement, handleSliderUpdateElement } = useUpdateElement()

  const [form, setForm] = useState({
    backgroundColor: selectedStyles['backgroundColor'] ?? '#000000',
    opacity: Number(selectedStyles['opacity'] ?? 1),
    borderRadius: selectedStyles['borderRadius']
      ? Number((selectedStyles['borderRadius'] as string).replace(/px/g, ''))
      : 0
  })

  const inputDebounce = useDebounce((e) => handleInputUpdateElement(e), 250)
  const sliderDebounce = useDebounce((name, value) => handleSliderUpdateElement(name, value), 250)

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

  const handleSlider = (name: string) => (value: number | number[]) => {
    if (Array.isArray(value)) return

    setForm((prev) => ({ ...prev, [name]: value }))

    let v: string | number = value
    if (name === 'borderRadius') {
      v = `${value}px`
    }

    sliderDebounce(name, v)
  }

  const [isBorderRadiusFull, setIsBorderRadiusFull] = useState(false)
  const handleBorderRadiusFull = (name: string) => (isSelected: boolean) => {
    setIsBorderRadiusFull(isSelected)

    if (isSelected) {
      sliderDebounce(name, '50%')
      return
    }
    sliderDebounce(name, `${form.borderRadius}px`)
  }
  return (
    <>
      <div className='flex flex-col gap-3'>
        <Slider
          name='opacity'
          label='Opacity'
          color='foreground'
          step={0.01}
          maxValue={1}
          minValue={0}
          showOutline
          value={form.opacity}
          onChange={handleSlider('opacity')}
          disableThumbScale
          disableAnimation
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

        <div className='flex items-end space-x-2'>
          <Slider
            label='Border Radius'
            color='foreground'
            step={1}
            maxValue={isBorderRadiusFull ? 10000 : 50}
            minValue={0}
            isDisabled={isBorderRadiusFull}
            className='max-w-md'
            aria-label='Border Radius'
            showOutline
            showTooltip
            name='borderRadius'
            value={form.borderRadius}
            onChange={handleSlider('borderRadius')}
          />
          <Tooltip content='Border Radius Full' placement='left-end'>
            <Switch
              isSelected={isBorderRadiusFull}
              isDisabled={false}
              onValueChange={handleBorderRadiusFull('borderRadius')}
            />
          </Tooltip>
        </div>

        <span className='text-foreground-600'>Background color</span>
        <div className='flex gap-3'>
          <input
            type='color'
            name='backgroundColor'
            value={isHexColor(form.backgroundColor) ? form.backgroundColor : '#ffffff'}
            onChange={handleColor}
            className='h-auto w-1/5 cursor-pointer'
          />
          <Input
            value={form.backgroundColor}
            name='backgroundColor'
            radius='sm'
            className='w-4/5'
            autoComplete='off'
            onChange={handleInputValue}
          />
        </div>

        <span className='text-foreground-600'>Background Image</span>
      </div>
    </>
  )
}

const FlexBox = ({
  selectedStyles,
  componentGroup
}: {
  selectedStyles: React.CSSProperties
  componentGroup: ComponentGroup
}) => {
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

  const isDisable = componentGroup !== 'Layout'

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
                <AlignHorizontalJustifyStart />
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
                <AlignHorizontalJustifyCenter />
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
                <AlignHorizontalJustifyEnd />
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
                <AlignHorizontalSpaceBetween />
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
                <AlignHorizontalSpaceAround />
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
                <AlignVerticalJustifyStart />
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
                <AlignVerticalJustifyCenter />
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
                <AlignVerticalJustifyEnd />
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

const CustomBox = ({ customStyles }: { customStyles: React.CSSProperties | undefined }) => {
  const { handleBtnUpdateElement, handleCustomCss } = useUpdateElement()

  const keyRef = useRef<HTMLInputElement | null>(null)
  const valueRef = useRef<HTMLInputElement | null>(null)

  const [isValid, setIsValid] = useState(false)

  const handleDeleteCustomCss = (property: string) => {
    handleCustomCss(property)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const key = keyRef.current?.value!
      const value = valueRef.current?.value!

      try {
        if (validateCssProperty(key, value)) {
          setIsValid(false)
          handleBtnUpdateElement(key, value, true)

          keyRef.current!.value = ''
          valueRef.current!.value = ''
        } else {
          setIsValid(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const filteredCustomCss = useMemo(() => {
    if (typeof customStyles === 'undefined') return []

    return Object.entries(customStyles).filter(([_, value]) => typeof value !== 'undefined')
  }, [customStyles])

  return (
    <>
      <form onKeyDown={handleKeyDown} className='flex flex-col gap-4'>
        <span className='text-foreground-600'>
          Enter your CSS properties, e.g. margin, 10px in this format
        </span>

        <div className='flex flex-wrap gap-3'>
          {filteredCustomCss.map(([property, value]) => (
            <Chip
              key={`${property}-${value}`}
              onClose={() => handleDeleteCustomCss(property)}
              variant='flat'
              color='success'>
              {`${property}: ${value}`}
            </Chip>
          ))}
        </div>

        <div className='flex gap-2'>
          <Input
            ref={keyRef}
            className='w-1/2'
            placeholder='e.g. margin'
            isInvalid={isValid}
            errorMessage='This is not a valid format'
          />
          <Input ref={valueRef} className='w-1/2' placeholder='e.g. 10px' isInvalid={isValid} />
        </div>
      </form>
    </>
  )
}

function StylesTab({
  children,
  componentGroup
}: React.PropsWithChildren<{ componentGroup: ComponentGroup }>) {
  const isDisable = componentGroup !== 'Layout'
  return (
    <Accordion
      selectionMode='multiple'
      variant='shadow'
      className='rounded-none'
      defaultExpandedKeys='all'>
      <AccordionItem
        key='5'
        aria-label='CustomBox'
        title='CustomBox'
        classNames={{ heading: 'font-bold' }}>
        {React.Children.toArray(children)[4]}
      </AccordionItem>

      <AccordionItem
        key='1'
        aria-label='Typography'
        title='Typography'
        classNames={{ heading: 'font-bold', content: 'pb-4' }}>
        {React.Children.toArray(children)[0]}
      </AccordionItem>

      <AccordionItem
        key='2'
        aria-label='Dimensions'
        title='Dimensions'
        classNames={{ heading: 'font-bold' }}>
        {React.Children.toArray(children)[1]}
      </AccordionItem>

      <AccordionItem
        key='3'
        aria-label='Decorations'
        title='Decorations'
        classNames={{ heading: 'font-bold' }}>
        {React.Children.toArray(children)[2]}
      </AccordionItem>

      <AccordionItem
        key='4'
        aria-label='Flexbox'
        title='Flexbox'
        isDisabled={isDisable}
        classNames={{ heading: 'font-bold' }}>
        {React.Children.toArray(children)[3]}
      </AccordionItem>
    </Accordion>
  )
}

StylesTab.Typography = Typography
StylesTab.Dimensions = Dimensions
StylesTab.Decorations = Decorations
StylesTab.FlexBox = FlexBox
StylesTab.CustomBox = CustomBox
export default StylesTab

function isHexColor(value: string) {
  // Regular expression to match a valid 6-digit or 3-digit hex color code
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i
  return hexRegex.test(value)
}

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

const flexDirectionOptions = [
  { key: 'column', label: 'column' },
  { key: 'column-reverse', label: 'column-reverse' },
  { key: 'row', label: 'row' },
  { key: 'row-reverse', label: 'row-reverse' }
]

const validateCssProperty = (property: string, value: string): boolean => {
  const emptyElement = document.createElement('div')
  const checkProperty = Object.keys(emptyElement.style).some((i) => i === property)
  if (!checkProperty) return false

  emptyElement.style[property as any] = value

  if (emptyElement.style[property as any]) {
    return true
  } else {
    return false
  }
}
