'use client'

import React from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ProjectData } from '@/model/web-builder'
import Editor from './index'

type Props = {
  data: ProjectData[]
}

export default function EditorClient(props: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <Editor>
        <Editor.Toolbox />
        <div className='flex w-full' style={{ height: '97%' }}>
          <Editor.Canvas></Editor.Canvas>
          <Editor.SideBar></Editor.SideBar>
        </div>
      </Editor>
    </LazyMotion>
  )
}
