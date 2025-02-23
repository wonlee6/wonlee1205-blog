import { memo, useState } from 'react'

import { Divider, Input } from '@heroui/react'

import { useDebounce } from '@/hooks/useDebounce'
import useUpdateElement from '@/hooks/useUpdateElement'

function Dimensions({ selectedStyles }: { selectedStyles: React.CSSProperties }) {
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

export default memo(Dimensions)
