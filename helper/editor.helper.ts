import { v4 } from 'uuid'
import CryptoJS from 'crypto-js'
import { ContainerDefaultStyles, InputDefaultStyles } from '@/lib/constants'
import { ComponentType, EditorElement, ElementType } from '@/model/web-builder'

export function isElementType(content: EditorElement[] | ElementType): content is ElementType {
  return typeof content !== 'undefined' && !Array.isArray(content)
}

export function addElementByType(componentType: ComponentType): EditorElement | undefined {
  switch (componentType) {
    case 'Container':
      return {
        content: [],
        id: v4(),
        name: 'Container',
        styles: { ...ContainerDefaultStyles },
        type: 'Container'
      }
    case 'Text':
      return {
        content: { innerText: 'Text Element' },
        id: v4(),
        name: 'Text',
        styles: {
          ...InputDefaultStyles
        },
        type: 'Text'
      }
    case 'Button':
      return {
        content: { innerText: 'Button' },
        id: v4(),
        name: 'Button',
        styles: {},
        type: 'Button'
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