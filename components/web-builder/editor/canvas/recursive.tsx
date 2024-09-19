'use client'

import ButtonElement from '../components/forms/button'
import LabelElement from '../components/forms/label'
import Text from '../components/forms/text'
import TextAreaElement from '../components/forms/text-area'
import ImageElement from '../components/media/image-element'
import YouTube from '../components/media/youtube'
import Flex from '../components/structure/flex'
import BlockQuote from '../components/typography/block-quote'
import Heading from '../components/typography/heading'
import Paragraph from '../components/typography/paragraph'
import TextLink from '../components/typography/text-link'
import { RecursiveComponent } from '@/model/web-builder'

export default function Recursive(props: RecursiveComponent) {
  const { name } = props

  switch (name) {
    case 'Flex':
      return <Flex {...(props as RecursiveComponent<'Flex'>)} />
    case 'Text':
      return <Text {...(props as RecursiveComponent<'Text'>)} />
    case 'TextArea':
      return <TextAreaElement {...(props as RecursiveComponent<'TextArea'>)} />
    case 'Button':
      return <ButtonElement {...(props as RecursiveComponent<'Button'>)} />
    case 'YouTube':
      return <YouTube {...(props as RecursiveComponent<'YouTube'>)} />
    case 'Image':
      return <ImageElement {...(props as RecursiveComponent<'Image'>)} />
    case 'Label':
      return <LabelElement {...(props as RecursiveComponent<'Label'>)} />
    case 'Heading':
      return <Heading {...(props as RecursiveComponent<'Heading'>)} />
    case 'Paragraph':
      return <Paragraph {...(props as RecursiveComponent<'Paragraph'>)} />
    case 'TextLink':
      return <TextLink {...(props as RecursiveComponent<'TextLink'>)} />
    case 'BlockQuote':
      return <BlockQuote {...(props as RecursiveComponent<'BlockQuote'>)} />
    default:
      return null
  }
}
