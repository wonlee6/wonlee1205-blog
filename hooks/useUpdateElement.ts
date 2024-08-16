import React, { useCallback } from 'react'
import { useEditorStore } from '@/providers/user-store-provider'

export default function useUpdateElement() {
  const { onInputUpdateElement } = useEditorStore((state) => state)

  const handleInputUpdateElement = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onInputUpdateElement(e.target.name, e.target.value)
    },
    [onInputUpdateElement]
  )

  const handleBtnUpdateElement = useCallback((name: string, value: string) => {
    //
  }, [])

  return {
    handleInputUpdateElement,
    handleBtnUpdateElement
  }
}
