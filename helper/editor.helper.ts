import CryptoJS from 'crypto-js'
import { v4 } from 'uuid'

import { ContainerDefaultStyles, InputDefaultStyles, YouTubeDefaultStyles } from '@/lib/constants'
import { ComponentName, EditorElement, ElementType } from '@/model/web-builder'

export function isElementType(content: EditorElement[] | ElementType): content is ElementType {
  return typeof content !== 'undefined' && !Array.isArray(content)
}

export function addElementByType(componentName: ComponentName): EditorElement | undefined {
  switch (componentName) {
    case 'Flex':
      return {
        content: [],
        id: v4(),
        name: 'Flex',
        styles: { ...ContainerDefaultStyles },
        group: 'Layout'
      }
    case 'Label':
      return {
        content: { innerText: 'Name' },
        id: v4(),
        name: 'Label',
        styles: {
          ...InputDefaultStyles
        },
        group: 'Element'
      }
    case 'Text':
      return {
        content: { innerText: 'Text Element' },
        id: v4(),
        name: 'Text',
        styles: {
          ...InputDefaultStyles
        },
        group: 'Element'
      }
    case 'Button':
      return {
        content: { innerText: 'Button Text' },
        id: v4(),
        name: 'Button',
        styles: {},
        group: 'Element'
      }
    case 'YouTube':
      return {
        content: {
          url: ''
        },
        id: v4(),
        name: 'YouTube',
        styles: {
          ...YouTubeDefaultStyles
        },
        group: 'Element'
      }
    default:
      return undefined
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
