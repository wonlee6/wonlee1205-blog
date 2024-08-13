'use client'

import { ReactNode } from 'react'

import dynamic from 'next/dynamic'

const EditorToolbox = dynamic(() => import('./toolbox/index'))
const EditorCanvas = dynamic(() => import('./canvas/index'))
const EditorAttributes = dynamic(() => import('./attributes/index'))

const Editor = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex size-full h-auto flex-col'>{children}</div>
    </>
  )
}

Editor.Toolbox = EditorToolbox
Editor.Canvas = EditorCanvas
Editor.Attributes = EditorAttributes
export default Editor
