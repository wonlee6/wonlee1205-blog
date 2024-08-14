'use client'

import { Input } from '@/components/ui/input'
import { EditorElement } from '@/model/web-builder'
import clsx from 'clsx'

export default function Text(props: EditorElement) {
  const { content, name, id, styles } = props

  return <Input className={'w-full'} style={styles} />
}
