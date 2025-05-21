'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import React from 'react'

import components from './ui'

export default function MDXComponent({ code }: { code: string }) {
  const MDXCompo = useMDXComponent(code)

  return <MDXCompo components={components} />
}
