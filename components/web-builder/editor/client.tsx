'use client'

import { useEffect, useRef } from 'react'

import { LazyMotion, domAnimation } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

import Editor from './index'
import { EditorElement } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export default function EditorClient({ data }: { data: EditorElement[] }) {
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
        <Editor.Toolbox />
        <div className='relative flex w-full' style={{ height: '96%' }}>
          <Editor.Canvas></Editor.Canvas>
          <Editor.SideBar></Editor.SideBar>
        </div>
      </Editor>
    </LazyMotion>
  )
}
