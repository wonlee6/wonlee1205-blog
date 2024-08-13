import { memo, ReactNode } from 'react'

const EditorCanvas = ({ children }: { children?: ReactNode }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('text')
    console.log(data)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  return (
    <>
      <div
        className='relative h-full w-4/5 overflow-auto border-r border-t border-default-300 p-1'
        id='___body'
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        {children}
      </div>
    </>
  )
}

export default memo(EditorCanvas)
