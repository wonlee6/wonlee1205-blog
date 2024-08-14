'use client'

import { ReactNode } from 'react'

import dynamic from 'next/dynamic'

const EditorToolbox = dynamic(() => import('./toolbox/index'))
const EditorCanvas = dynamic(() => import('./canvas/index'))
const EditorSideBar = dynamic(() => import('./side-bar/index'))

const Editor = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex size-full flex-col'>{children}</div>
    </>
  )
}

Editor.Toolbox = EditorToolbox
Editor.Canvas = EditorCanvas
Editor.SideBar = EditorSideBar
export default Editor
