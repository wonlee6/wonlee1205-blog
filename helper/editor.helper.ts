import CryptoJS from 'crypto-js'
import { v4 } from 'uuid'

import {
  ContainerDefaultStyles,
  HeadingDefaultStyles,
  InputDefaultStyles,
  LabelDefaultStyles,
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
    case 'Flex':
      return {
        content: [],
        id: v4(),
        name: 'Flex',
        styles: { ...ContainerDefaultStyles },
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
    default:
      return undefined
  }
}

export function getDefaultStyleByComponentType(componentName: ComponentName) {
  switch (componentName) {
    case 'Flex':
      return { ...ContainerDefaultStyles }
    case 'Text':
      return { ...InputDefaultStyles }
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
