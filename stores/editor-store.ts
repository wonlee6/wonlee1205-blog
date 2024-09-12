import { createStore } from 'zustand/vanilla'

import { getDefaultStyleByComponentType, isEditorElementArray } from '@/helper/editor.helper'
import { ComponentName, EditorElement } from '@/model/web-builder'

type EditorState = {
  device: 'Desktop' | 'Tablet' | 'Mobile'
  elements: EditorElement[]
  selectedElement: EditorElement
  previewMode: boolean
  liveMode: boolean
  uploadImages: Array<{ path: string }>
  storageUrl: string
}

type EditorActions = {
  setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => void
  setLiveMode: () => void
  onAddElement: (id: string, elementDetails: EditorElement<ComponentName>) => void
  onSelectElement: (element: EditorElement) => void
  onDeleteElement: (id: string) => void
  onUpdateContentInElement: <T>(content: T) => void
  onUpdateElementStyle: (style: object, custom?: boolean) => void
  onDeleteCustomCss: (property: string) => void
  onDragItemOrder: (parentId: string, sourceIndex: number, destinationIndex: number) => void
  onUploadImage: (images: Array<{ path: string }>, url?: string) => void
  onDeleteImage: (deletePath: string) => void
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
  uploadImages: [],
  storageUrl: ''
}

export const createEditorStore = () => {
  return createStore<EditorStore>()((set) => ({
    ...initialState,
    setDevice: (device: 'Desktop' | 'Tablet' | 'Mobile') => set(() => ({ device })),
    setLiveMode: () => set((state) => ({ liveMode: !state.liveMode })),
    onAddElement: (id: string, elementDetails: EditorElement<ComponentName>) =>
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
    onUpdateContentInElement: <T>(content: T) =>
      set((state) => ({
        elements: updateContentInElement(state.elements, state.selectedElement.id, content)
      })),
    onUpdateElementStyle: (style: object, custom = false) =>
      set((state) => {
        return {
          ...state,
          selectedElement: {
            ...state.selectedElement,
            styles: {
              ...state.selectedElement.styles,
              ...style
            },
            ...(custom && {
              customStyles: {
                ...state.selectedElement.customStyles,
                ...style
              }
            })
          },
          elements: updateElementStyle(
            state.elements,
            state.selectedElement.id,
            { ...style },
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
    onUploadImage: (images: Array<{ path: string }>, url?: string) =>
      set(() => ({ uploadImages: images, ...(url && { storageUrl: url }) })),
    onDeleteImage: (deletePath: string) =>
      set((state) => ({ uploadImages: state.uploadImages.filter((i) => i.path !== deletePath) }))
  }))
}

const addElement = (
  editorArray: EditorElement[],
  id: string,
  elementDetails: EditorElement<ComponentName>
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
    if (isEditorElementArray(item.content)) {
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

const updateContentInElement = <T>(
  editorArray: EditorElement[],
  id: string,
  contents: T
): EditorElement[] => {
  return editorArray.map((item) => {
    if (isEditorElementArray(item.content)) {
      return {
        ...item,
        content: updateContentInElement(item.content, id, contents)
      }
    }
    if (item.id === id) {
      return {
        ...item,
        content: {
          ...item.content,
          ...contents
        }
      }
    }
    return item
  })
}

const updateElementStyle = (
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
        content: updateElementStyle(item.content, id, styleObject, custom)
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
