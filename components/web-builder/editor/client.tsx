'use client'

import { useEffect, useRef } from 'react'

import { LazyMotion, domAnimation } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

import Editor from './index'
import { EditorElement } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function EditorClient({
  data,
  projectName,
  description
}: {
  data: EditorElement[]
  projectName: string
  description: string
}) {
  const [onInitElement] = useEditorStore(useShallow((state) => [state.onInitElement]))

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted && data) {
      onInitElement(data)
    }
    isMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <LazyMotion features={domAnimation}>
      <Editor>
        <Editor.Toolbox projectName={projectName} description={description} />
        <div className='relative flex w-full' style={{ height: '96%' }}>
          <Editor.Canvas></Editor.Canvas>
          <Editor.SideBar></Editor.SideBar>
        </div>
      </Editor>
    </LazyMotion>
  )
}
