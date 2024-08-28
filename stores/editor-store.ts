import { createStore } from 'zustand/vanilla'

import { isElementType } from '@/helper/editor.helper'
import { getDefaultStyleByComponentType } from '@/lib/constants'
import { EditorElement } from '@/model/web-builder'

type EditorState = {
  device: 'Desktop' | 'Tablet' | 'Mobile'
  elements: EditorElement[]
  selectedElement: EditorElement
  previewMode: boolean
  liveMode: boolean
  uploadImages: Array<{ path: string }>
}

type EditorActions = {
  setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => void
  onAddElement: (id: string, elementDetails: EditorElement) => void
  onSelectElement: (element: EditorElement) => void
  onDeleteElement: (id: string) => void
  onUpdateElement: (name: string, value: string | number, custom?: boolean) => void
  onDeleteCustomCss: (property: string) => void
  onDragItemOrder: (parentId: string, sourceIndex: number, destinationIndex: number) => void
  onUploadImage: (images: Array<{ path: string }>) => void
}

export type EditorStore = EditorState & EditorActions

const initialState: EditorState = {
  previewMode: false,
  liveMode: false,
  device: 'Desktop',
  elements: [
    {
      id: '___body',
      name: 'Body',
      styles: {},
      group: 'Body',
      content: []
    }
  ],
  selectedElement: {
    id: '',
    name: null,
    styles: {},
    group: null,
    content: []
  },
  uploadImages: []
}

export const createEditorStore = () => {
  return createStore<EditorStore>()((set) => ({
    ...initialState,
    setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => set(() => ({ device })),
    onAddElement: (id: string, elementDetails: EditorElement) =>
      set((state) => ({
        elements: addElement(state.elements, id, elementDetails)
      })),
    onDeleteElement: (id: string) =>
      set((state) => ({
        elements: deleteElement(state.elements, id),
        selectedElement: {
          id: '',
          name: null,
          styles: {},
          group: null,
          content: []
        }
      })),
    onSelectElement: (element: EditorElement) =>
      set(() => ({
        selectedElement: {
          id: element.id,
          name: element.name,
          styles: element.styles,
          group: element.group,
          content: element.content
        }
      })),
    onUpdateElement: (name: string, value: string | number, custom = false) =>
      set((state) => {
        const styleObject = {
          [name]: value
        }
        return {
          ...state,
          selectedElement: {
            ...state.selectedElement,
            styles: {
              ...state.selectedElement.styles,
              ...styleObject
            },
            ...(custom && {
              customStyles: {
                ...state.selectedElement.customStyles,
                ...styleObject
              }
            })
          },
          elements: updateElement(
            state.elements,
            state.selectedElement.id,
            { ...styleObject },
            custom
          )
        }
      }),
    onDeleteCustomCss: (property: string) =>
      set((state) => {
        return {
          ...state,
          selectedElement: {
            ...state.selectedElement,
            customStyles: {
              [property]: undefined
            },
            styles: {
              ...state.selectedElement.styles,
              ...getDefaultStyleByComponentType(state.selectedElement.name)
            }
          },
          elements: deleteCustomCssInElement(state.elements, state.selectedElement.id, property)
        }
      }),
    onDragItemOrder: (parentId: string, sourceIndex: number, destinationIndex: number) =>
      set((state) => ({
        elements: changeDragItemOrder(state.elements, parentId, sourceIndex, destinationIndex)
      })),
    onUploadImage: (images: Array<{ path: string }>) => set(() => ({ uploadImages: images }))
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

const deleteElement = (editorArray: EditorElement[], id: string): EditorElement[] => {
  return editorArray.map((item) => {
    if (!isElementType(item.content)) {
      const existElement = item.content.some((i) => i.id === id)
      if (existElement) {
        return {
          ...item,
          content: item.content.filter((v) => v.id !== id)
        }
      }
      return {
        ...item,
        content: deleteElement(item.content, id)
      }
    }
    return item
  })
}

const updateElement = (
  editorArray: EditorElement[],
  id: string,
  styleObject: object,
  custom: boolean
): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        styles: {
          ...item.styles,
          ...styleObject
        },
        ...(custom && {
          customStyles: {
            ...item.customStyles,
            ...styleObject
          }
        })
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateElement(item.content, id, styleObject, custom)
      }
    }
    return item
  })
}

const deleteCustomCssInElement = (
  editorArray: EditorElement[],
  id: string,
  property: string
): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        customStyles: {
          [property]: undefined
        },
        styles: {
          ...item.styles,
          ...getDefaultStyleByComponentType(item.name)
        }
      }
    } else if (Array.isArray(item.content)) {
      return {
        ...item,
        content: deleteCustomCssInElement(item.content, id, property)
      }
    }
    return item
  })
}

function changeDragItemOrder(
  editorArray: EditorElement[],
  parentId: string,
  sourceIndex: number,
  destinationIndex: number
): EditorElement[] {
  return editorArray.map((item) => {
    if (item.id === parentId && Array.isArray(item.content)) {
      const sourceItem = item.content.at(sourceIndex)
      const removeSourceItem = item.content.toSpliced(sourceIndex, 1)
      const addSourceItemInDestination = removeSourceItem.toSpliced(
        destinationIndex,
        0,
        sourceItem!
      )
      return {
        ...item,
        content: addSourceItemInDestination
      }
    } else if (Array.isArray(item.content)) {
      return {
        ...item,
        content: changeDragItemOrder(item.content, parentId, sourceIndex, destinationIndex)
      }
    }
    return item
  })
}
