import { memo, useMemo, useRef, useState } from 'react'

import { Chip, Input } from '@nextui-org/react'

import useUpdateElement from '@/hooks/useUpdateElement'

function CustomStyle({ customStyles }: { customStyles: React.CSSProperties | undefined }) {
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

export default memo(CustomStyle)

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
