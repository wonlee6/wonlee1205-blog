import React, { useCallback } from 'react'
import { useEditorStore } from '@/providers/user-store-provider'

export default function useUpdateElement() {
  const { onUpdateElement, onDeleteCustomCss } = useEditorStore((state) => state)

  const handleInputUpdateElement = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateElement(e.target.name, e.target.value)
    },
    [onUpdateElement]
  )

  const handleBtnUpdateElement = useCallback(
    (name: string, value: string, custom = false) => {
      onUpdateElement(name, value, custom)
    },
    [onUpdateElement]
  )

  const handleSliderUpdateElement = useCallback(
    (name: string, value: number | string) => {
      onUpdateElement(name, value)
    },
    [onUpdateElement]
  )

  const handleCustomCss = useCallback(
    (property: string) => {
      onDeleteCustomCss(property)
    },
    [onDeleteCustomCss]
  )

  return {
    handleInputUpdateElement,
    handleBtnUpdateElement,
    handleSliderUpdateElement,
    handleCustomCss
  }
}
