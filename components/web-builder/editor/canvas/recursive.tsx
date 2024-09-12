import ButtonElement from '../components/button'
import Container from '../components/container'
import LabelElement from '../components/label'
import Text from '../components/text'
import Heading from '../components/typography/heading'
import YouTube from '../components/youtube'
import { hasArrayContent } from '@/helper/editor.helper'
import { RecursiveComponent } from '@/model/web-builder'

export default function Recursive(props: RecursiveComponent) {
  const { name } = props

  if (hasArrayContent(props)) {
    switch (name) {
      case 'Flex':
        return <Container {...props} />
      default:
        return null
    }
  }

  switch (name) {
    case 'Text':
      return <Text {...(props as RecursiveComponent<'Text'>)} />
    case 'Button':
      return <ButtonElement {...(props as RecursiveComponent<'Button'>)} />
    case 'YouTube':
      return <YouTube {...(props as RecursiveComponent<'YouTube'>)} />
    case 'Label':
      return <LabelElement {...(props as RecursiveComponent<'Label'>)} />
    case 'Heading':
      return <Heading {...(props as RecursiveComponent<'Heading'>)} />
    default:
      return null
  }
}
