'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createEditorStore, type EditorStore } from '@/stores/editor-store'

export type EditorStoreApi = ReturnType<typeof createEditorStore>

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(undefined)

export interface EditorStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({ children }: EditorStoreProviderProps) => {
  const storeRef = useRef<EditorStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createEditorStore()
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>{children}</EditorStoreContext.Provider>
  )
}

export const useEditorStore = <T,>(selector: (store: EditorStore) => T): T => {
  const editorStoreContext = useContext(EditorStoreContext)

  if (!editorStoreContext) {
    throw new Error(`EditorStoreContext must be used within UserStoreProvider`)
  }

  return useStore(editorStoreContext, selector)
}
