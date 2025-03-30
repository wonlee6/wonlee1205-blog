
import { memo, useEffect, useRef, useState } from 'react'

import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Switch,
  Tooltip,
  useDisclosure
} from '@heroui/react'
import { ImageIcon } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'
import useUpdateElement from '@/hooks/useUpdateElement'
import { getStorageUrl } from '@/lib/session'
import { cn } from '@/lib/utils'

type DecorationsProps = {
  selectedStyles: React.CSSProperties
  uploadImages: { path: string }[]
  hasSelectedItem: boolean
}

function DecorationsStyle({ selectedStyles, uploadImages, hasSelectedItem }: DecorationsProps) {
  const { handleInputUpdateElement, handleSliderUpdateElement, handleBtnUpdateElement } =
    useUpdateElement()

  const [form, setForm] = useState({
    backgroundColor: selectedStyles['backgroundColor'] ?? '#000000',
    opacity: Number(selectedStyles['opacity'] ?? 1),
    borderRadius: selectedStyles['borderRadius']
      ? Number((selectedStyles['borderRadius'] as string).replace(/px/g, ''))
      : 0,
    backgroundImage: selectedStyles['backgroundImage'] ?? null
  })

  const urlRef = useRef('')

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
     
    ;(async () => {
      urlRef.current = await getStorageUrl()
    })()
  }, [])

  const handleSelectImage = (path: string) => {
    setForm((prev) => ({ ...prev, backgroundImage: path }))
  }

  const handleSaveImage = () => {
    handleBtnUpdateElement('backgroundImage', `url(${form.backgroundImage})`)
  }

  const handleImageDelete = () => {
    const ok = confirm('Do you want to delete?')
    if (ok) {
      setForm((prev) => ({ ...prev, backgroundImage: null }))
      handleBtnUpdateElement('backgroundImage', '')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-3 pb-3'>
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
        <Button
          variant='solid'
          color='primary'
          radius='sm'
          isDisabled={!hasSelectedItem}
          onPress={onOpen}
          startContent={<ImageIcon />}>
          Select Background Image
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shadow='md'
        backdrop='opaque'
        className='max-h-[70vh] overflow-y-auto'
        size='xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Image list in storage</ModalHeader>
              <ModalBody>
                {uploadImages.length > 0 ? (
                  uploadImages.map((item, index) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <div
                        className={cn(
                          'flex cursor-pointer items-center gap-4 rounded-md shadow-md hover:bg-default-100',
                          {
                            'bg-primary-50':
                              form.backgroundImage &&
                              form.backgroundImage === `${urlRef.current}/${item.path}`
                          }
                        )}
                        onClick={() => handleSelectImage(`${urlRef.current}/${item.path}`)}
                        tabIndex={0}
                        role='listbox'
                        key={`${urlRef.current}/${item.path}-${index}`}>
                        <Image
                          src={`${urlRef.current}/${item.path}`}
                          alt={item.path}
                          isBlurred
                          width={120}
                          radius='none'
                        />
                        <span className='truncate' title={item.path}>
                          {item.path}
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <>Empty Image.</>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='warning' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={() => {
                    onClose()
                    handleSaveImage()
                  }}>
                  Save
                </Button>
                {form.backgroundImage && (
                  <Button color='danger' variant='light' onPress={handleImageDelete}>
                    Clear
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default memo(DecorationsStyle)

function isHexColor(value: string) {
  // Regular expression to match a valid 6-digit or 3-digit hex color code
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i
  return hexRegex.test(value)
}
