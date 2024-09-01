import ButtonElement from '../components/button'
import Container from '../components/container'
import Text from '../components/text'
import YouTube from '../components/youtube'
import { RecursiveComponent } from '@/model/web-builder'

export default function Recursive(props: RecursiveComponent) {
  const { name } = props

  switch (name) {
    case 'Text':
      return <Text {...props} />
    case 'Container':
      return <Container {...props} />
    case 'Button':
      return <ButtonElement {...props} />
    case 'YouTube':
      return <YouTube {...props} />
    default:
      return null
  }
}
