import { addElementByType } from '@/helper/editor.helper'
import { ComponentName } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

const useDragAndDrop = (index: number, parentId: string) => {
  const { liveMode, onAddElement, onDragItemOrder } = useEditorStore((state) => state)

  const onDragStartInElement = (e: React.DragEvent) => {
    if (liveMode) return
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDropInElement = (e: React.DragEvent) => {
    e.stopPropagation()
    if (liveMode) return

    const sourceIndex = e.dataTransfer.getData('text')

    if (!isNaN(Number(sourceIndex))) {
      const destinationIndex = index
      onDragItemOrder(parentId, Number(sourceIndex), Number(destinationIndex))
      return
    }
    const value = addElementByType(sourceIndex as ComponentName)
    if (typeof value !== 'undefined') {
      onAddElement(parentId, value, index + 1)
    }
  }

  return {
    onDragStartInElement,
    onDropInElement
  }
}

export default useDragAndDrop
