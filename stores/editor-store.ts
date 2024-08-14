import { isElementType } from '@/lib/editor'
import { ComponentType, EditorElement } from '@/model/web-builder'
import { createStore } from 'zustand/vanilla'

export type EditorState = {
  device: 'Desktop' | 'Tablet' | 'Mobile'
  elements: EditorElement[]
  selectedElement: EditorElement
  previewMode: boolean
  liveMode: boolean
}

export type EditorActions = {
  setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => void
  handleAddElement: (id: string, elementDetails: EditorElement) => void
}

export type EditorStore = EditorState & EditorActions

export const createEditorStore = () => {
  return createStore<EditorStore>()((set) => ({
    previewMode: false,
    liveMode: false,
    device: 'Desktop',
    elements: [
      {
        id: '___body',
        name: 'Body',
        styles: {},
        type: '___body',
        content: []
      }
    ],
    selectedElement: {
      id: '',
      name: '',
      styles: {},
      type: null,
      content: []
    },
    setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => set(() => ({ device })),
    handleAddElement: (id: string, elementDetails: EditorElement) =>
      set((state) => ({
        elements: addElement(state.elements, id, elementDetails)
      }))
  }))
}

const addElement = (
  editorArray: EditorElement[],
  id: string,
  elementDetails: EditorElement
): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === id && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, elementDetails]
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addElement(item.content, id, elementDetails)
      }
    }
    return item
  })
}

// const addAnElement = (
//   editorArray: EditorElement[],
//   action: EditorAction
// ): EditorElement[] => {
//   if (action.type !== 'ADD_ELEMENT')
//     throw Error(
//       'You sent the wrong action type to the Add Element editor State'
//     )
//   return editorArray.map((item) => {
//     if (item.id === action.payload.containerId && Array.isArray(item.content)) {
//       return {
//         ...item,
//         content: [...item.content, action.payload.elementDetails],
//       }
//     } else if (item.content && Array.isArray(item.content)) {
//       return {
//         ...item,
//         content: addAnElement(item.content, action),
//       }
//     }
//     return item
//   })
// }
