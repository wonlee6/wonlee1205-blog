'use client'

import { EditorElement } from '@/model/web-builder'
import Container from '../components/container'
import Text from '../components/text'

export default function Recursive(props: EditorElement) {
  const { type } = props

  switch (type) {
    case 'Text':
      return <Text {...props} />
    case 'Container':
      return <Container {...props} />
    default:
      return null
  }
}
