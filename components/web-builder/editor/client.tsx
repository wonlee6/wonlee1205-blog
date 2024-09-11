'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

import Editor from './index'

export default function EditorClient() {
  return (
    <LazyMotion features={domAnimation}>
      <Editor>
        <Editor.Toolbox />
        <div className='relative flex w-full' style={{ height: '96%' }}>
          <Editor.Canvas></Editor.Canvas>
          <Editor.SideBar></Editor.SideBar>
        </div>
      </Editor>
    </LazyMotion>
  )
}
