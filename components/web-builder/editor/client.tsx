'use client'

import { domAnimation, LazyMotion, m } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useEditorStore } from '@/providers/user-store-provider'
import { EditorElement } from '@/types/web-builder'

import Editor from './index'

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
        <m.div
          initial={{ x: 10000 }}
          animate={{
            x: 0
          }}
          transition={{
            type: 'spring',
            stiffness: 35
          }}
          layout
          className='relative flex w-full overflow-hidden'
          style={{ height: '96%' }}>
          <Editor.Canvas></Editor.Canvas>
          <Editor.SideBar></Editor.SideBar>
        </m.div>
      </Editor>
    </LazyMotion>
  )
}
