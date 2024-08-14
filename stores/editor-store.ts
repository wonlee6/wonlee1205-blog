import { createStore } from 'zustand/vanilla'

export type EditorState = {
  device: 'Desktop' | 'Tablet' | 'Mobile'
}

export type EditorActions = {
  setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => void
}

export type EditorStore = EditorState & EditorActions

export const createEditorStore = () => {
  return createStore<EditorStore>()((set) => ({
    device: 'Desktop',
    setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => set(() => ({ device }))
  }))
}
