import React, { useCallback } from 'react'

import { useEditorStore } from '@/providers/user-store-provider'

export default function useUpdateElement() {
  const { onUpdateElementStyle, onDeleteCustomCss } = useEditorStore((state) => state)

  const handleInputUpdateElement = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateElementStyle(e.target.name, e.target.value)
    },
    [onUpdateElementStyle]
  )

  const handleBtnUpdateElement = useCallback(
    (name: string, value: string, custom = false) => {
      onUpdateElementStyle(name, value, custom)
    },
    [onUpdateElementStyle]
  )

  const handleSliderUpdateElement = useCallback(
    (name: string, value: number | string) => {
      onUpdateElementStyle(name, value)
    },
    [onUpdateElementStyle]
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
