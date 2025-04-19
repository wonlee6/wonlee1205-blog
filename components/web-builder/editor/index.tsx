'use client'

import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

const EditorToolbox = dynamic(() => import('./toolbox/index'))
const EditorCanvas = dynamic(() => import('./canvas/index'))
const EditorSideBar = dynamic(() => import('./side-bar/index'))

const Editor = ({ children }: { children: ReactNode }) => {
  return (
    <React.Suspense fallback={<></>}>
      <div className='flex size-full flex-col overflow-hidden'>{children}</div>
    </React.Suspense>
  )
}

Editor.Toolbox = EditorToolbox
Editor.Canvas = EditorCanvas
Editor.SideBar = EditorSideBar
export default Editor
