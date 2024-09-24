import { useEditorStore } from '@/providers/user-store-provider'

const useDragAndDrop = (index: number, parentId: string) => {
  const { liveMode, onDragItemOrder } = useEditorStore((state) => state)

  const onDragStartInElement = (e: React.DragEvent) => {
    if (liveMode) return
    e.stopPropagation()

    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'all'
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDropInElement = (e: React.DragEvent) => {
    if (liveMode) return
    e.stopPropagation()

    const sourceIndex = e.dataTransfer.getData('text')
    const destinationIndex = index
    onDragItemOrder(parentId, Number(sourceIndex), Number(destinationIndex))
  }

  return {
    onDragStartInElement,
    onDropInElement
  }
}

export default useDragAndDrop
