'use client'

import { ProjectData } from '@/model/web-builder'
import React, { useState } from 'react'
import Editor from './index'

type Props = {
  data: ProjectData[]
}
export default function EditorClient(props: Props) {
  return (
    <>
      <Editor>
        <Editor.Toolbox />
        <div className='flex size-full'>
          <Editor.Canvas>Drag here</Editor.Canvas>
          <Editor.Attributes></Editor.Attributes>
        </div>
      </Editor>
    </>
  )
}
