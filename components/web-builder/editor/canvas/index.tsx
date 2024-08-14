'use client'

import { memo, ReactNode } from 'react'
import { m } from 'framer-motion'

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
      <m.section
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { ease: 'linear' },
          layout: { duration: 0.5 }
        }}
        className='relative h-full w-4/5 overflow-auto border-r border-t border-default-300 p-1'
        id='___body'
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        {children}
      </m.section>
    </>
  )
}

export default memo(EditorCanvas)
