import CryptoJS from 'crypto-js'
import { v4 } from 'uuid'

import {
  BlockDefaultStyles,
  BlockQuoteDefaultStyles,
  FlexDefaultStyles,
  HeadingDefaultStyles,
  ImageDefaultStyles,
  InputDefaultStyles,
  LabelDefaultStyles,
  ParagraphDefaultStyles,
  TextAreaDefaultStyles,
  TextLinkDefaultStyles,
  YouTubeDefaultStyles
} from '@/lib/constants'
import {
  ComponentName,
  EditorElement,
  AllElementType,
  RecursiveComponent,
  NonLayoutComponentName
} from '@/model/web-builder'

export function isEditorElementArray(
  content: AllElementType<NonLayoutComponentName> | EditorElement<ComponentName>[]
): content is EditorElement<ComponentName>[] {
  return typeof content !== 'undefined' && Array.isArray(content)
}

export function hasArrayContent(
  component: RecursiveComponent
): component is RecursiveComponent<'Flex' | 'Body'> {
  return Array.isArray(component.content)
}

export function addElementByType(componentName: ComponentName): EditorElement | undefined {
  switch (componentName) {
    // Structure
    case 'Block':
      return {
        content: [],
        id: v4(),
        name: 'Block',
        styles: { ...BlockDefaultStyles },
        group: 'Structure'
      }
    case 'Flex':
      return {
        content: [],
        id: v4(),
        name: 'Flex',
        styles: { ...FlexDefaultStyles },
        group: 'Structure'
      }
    // Typography
    case 'Heading':
      return {
        content: {
          text: 'Heading',
          heading: 1
        },
        id: v4(),
        name: 'Heading',
        styles: {
          ...HeadingDefaultStyles
        },
        group: 'Typography'
      }
    case 'Paragraph':
      return {
        content: {
          text: defaultParagraphText
        },
        id: v4(),
        name: 'Paragraph',
        styles: {
          ...ParagraphDefaultStyles
        },
        group: 'Typography'
      }
    case 'TextLink':
      return {
        content: {
          text: 'Text Link in Typography',
          href: '',
          prefetch: undefined
        },
        id: v4(),
        name: 'TextLink',
        styles: {
          ...TextLinkDefaultStyles
        },
        group: 'Typography'
      }
    case 'BlockQuote':
      return {
        content: {
          text: 'Various countries around the globe have governmental policies regarding web accessibility as well. Most well known of these are Section 508 in the US and Web Accessibility Directive of the European Union.'
        },
        id: v4(),
        name: 'BlockQuote',
        styles: {
          ...BlockQuoteDefaultStyles
        },
        group: 'Typography'
      }
    // Forms
    case 'Label':
      return {
        content: { text: 'Name', id: '' },
        id: v4(),
        name: 'Label',
        styles: {
          ...LabelDefaultStyles
        },
        group: 'Forms'
      }
    case 'Text':
      return {
        content: { innerText: 'Text Element', id: '', maxLength: 2000 },
        id: v4(),
        name: 'Text',
        styles: {
          ...InputDefaultStyles
        },
        group: 'Forms'
      }
    case 'TextArea':
      return {
        content: { innerText: 'Text Area Element', id: '', maxLength: 2000 },
        id: v4(),
        name: 'TextArea',
        styles: {
          ...TextAreaDefaultStyles
        },
        group: 'Forms'
      }
    case 'Button':
      return {
        content: { innerText: 'Button Text', href: '' },
        id: v4(),
        name: 'Button',
        styles: {},
        group: 'Forms'
      }
    // Media
    case 'YouTube':
      return {
        content: {
          url: '',
          mute: false,
          loop: false,
          autoplay: false,
          showControls: true
        },
        id: v4(),
        name: 'YouTube',
        styles: {
          ...YouTubeDefaultStyles
        },
        group: 'Media'
      }
    case 'Image':
      return {
        content: {
          src: '',
          alt: '',
          width: 400,
          height: 300,
          radius: 'lg',
          shadow: 'none',
          blur: false,
          zoom: false
        },
        id: v4(),
        name: 'Image',
        styles: {
          ...ImageDefaultStyles
        },
        group: 'Media'
      }
    default:
      return undefined
  }
}

export function getDefaultStyleByComponentType(componentName: ComponentName) {
  switch (componentName) {
    case 'Block':
      return { ...BlockDefaultStyles }
    case 'Flex':
      return { ...FlexDefaultStyles }
    case 'BlockQuote':
      return {
        ...BlockQuoteDefaultStyles
      }
    case 'Paragraph':
      return {
        ...ParagraphDefaultStyles
      }
    case 'Image':
      return {
        ...ImageDefaultStyles
      }
    case 'TextArea':
      return {
        ...TextAreaDefaultStyles
      }
    case 'Text':
      return { ...InputDefaultStyles }
    case 'TextLink':
      return {
        ...TextLinkDefaultStyles
      }
    case 'YouTube':
      return {
        ...YouTubeDefaultStyles
      }
    case 'Label':
      return {
        ...LabelDefaultStyles
      }
    case 'Heading':
      return {
        ...HeadingDefaultStyles
      }
    default:
      return {}
  }
}

const secretKey = process.env.NEXT_PUBLIC_SESSION_KEY!

export function encryptFormData(data: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}

export function decryptFormData<T>(encryptedData: string): T {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

const defaultParagraphText =
  '삶은 때로 우리를 예상치 못한 방향으로 이끌지만, 중요한 것은 그 과정에서 무엇을 배우고, 어떻게 성장하느냐에 달려 있습니다. 실패는 끝이 아닌 또 다른 시작이며, 성공은 우리가 걸어온 길을 되돌아볼 기회일 뿐입니다. 아무리 어려운 상황이라도 포기하지 않고 한 걸음씩 나아가다 보면, 어느새 목표에 가까워져 있는 자신을 발견하게 될 것입니다. 결국, 우리의 의지와 끈기가 모든 것을 결정합니다. 오늘 내딛는 작은 발걸음이 미래의 큰 변화를 가져올 수 있음을 기억하세요.'
