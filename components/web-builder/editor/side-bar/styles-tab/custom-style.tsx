import { memo, useMemo, useState } from 'react'

import { Chip, Input } from '@heroui/react'

import useUpdateElement from '@/hooks/useUpdateElement'

function CustomStyle({ customStyles }: { customStyles: React.CSSProperties | undefined }) {
  const { handleBtnUpdateElement, handleCustomCss } = useUpdateElement()

  const [form, setForm] = useState({
    key: '',
    value: ''
  })

  const [isValid, setIsValid] = useState(false)

  const handleDeleteCustomCss = (property: string) => {
    handleCustomCss(property)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (validateCssProperty(form.key, form.value)) {
          setIsValid(false)
          handleBtnUpdateElement(form.key, form.value, true)

          setForm({
            key: '',
            value: ''
          })
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
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
            className='w-1/2'
            placeholder='e.g. margin'
            isInvalid={isValid}
            errorMessage='This is not a valid format'
            maxLength={50}
          />
          <Input
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className='w-1/2'
            placeholder='e.g. 10px'
            isInvalid={isValid}
            maxLength={50}
          />
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
