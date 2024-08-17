import React, { useCallback } from 'react'
import { useEditorStore } from '@/providers/user-store-provider'

export default function useUpdateElement() {
  const { onUpdateElement } = useEditorStore((state) => state)

  const handleInputUpdateElement = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateElement(e.target.name, e.target.value)
    },
    [onUpdateElement]
  )

  const handleBtnUpdateElement = useCallback(
    (name: string, value: string) => {
      onUpdateElement(name, value)
    },
    [onUpdateElement]
  )

  const handleSliderUpdateElement = useCallback(
    (name: string, value: number | string) => {
      onUpdateElement(name, value)
    },
    [onUpdateElement]
  )

  return {
    handleInputUpdateElement,
    handleBtnUpdateElement,
    handleSliderUpdateElement
  }
}
