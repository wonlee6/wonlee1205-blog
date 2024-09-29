import { z } from 'zod'

export const AuthFormSchema = z.object({
  name: z.string().min(4, { message: 'ID must contain at least 4 character(s)' }).max(20),
  password: z.string().min(4, { message: 'Password must contain at least 4 character(s)' }).max(20)
})

export type AuthFormSchemaModel = z.infer<typeof AuthFormSchema>

export const ProjectFormSchema = z.object({
  user_id: z.string(),
  type: z.literal('add').or(z.literal('edit')),
  projectName: z.string().min(2).max(100),
  description: z.string().max(1000),
  selectedItemId: z.string().optional()
})

export type ProjectFormSchemaModel = z.infer<typeof ProjectFormSchema>

export type ProjectData = {
  id: string
  user_id: string
  projectName: string
  description: string
  contents: EditorElement
  created_at: string
  updated_at: string
}

export const FunnelPageSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  page_name: z.string().min(2).max(50),
  description: z.string().max(1000),
  contents: z.string(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true })
})

export type FunnelPageSchemaModel = z.infer<typeof FunnelPageSchema>

const StorageSchema = z.object({
  name: z.string(),
  id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  last_accessed_at: z.string(),
  url: z.string(),
  metadata: z.object({
    eTag: z.string(),
    size: z.number(),
    mimetype: z.string(),
    cacheControl: z.string(),
    lastModified: z.string(),
    contentLength: z.number(),
    httpStatusCode: z.number()
  })
})

export type StorageSchemaModel = z.infer<typeof StorageSchema>

export type ComponentName =
  | 'Body'
  // Structure
  | 'Block'
  | 'Flex'
  // Typography
  | 'Heading'
  | 'Paragraph'
  | 'TextLink'
  | 'BlockQuote'
  // Forms
  | 'Label'
  | 'Text'
  | 'TextArea'
  | 'Button'
  // Media
  | 'Image'
  | 'YouTube'
  | null

type HeadingElement = {
  text: string
  heading: number
}
type ParagraphElement = {
  text: string
}
type TextLinkElement = {
  text: string
  href: string
  prefetch: undefined | boolean
}
type BlockQuoteElement = {
  text: string
}
type ButtonElement = {
  href: string
  innerText: string
}
type TextElement = {
  innerText: string
  id: string
  maxLength: number
}

type LabelElement = {
  text: string
  id: string
}
type YouTubeElement = {
  url: string
  mute: boolean
  loop: boolean
  autoplay: boolean
  showControls: boolean
}
type ImageElement = {
  src: string
  alt: string
  width: number
  height: number
  blur: boolean
  zoom: boolean
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full' | undefined
  shadow: 'none' | 'sm' | 'md' | 'lg' | undefined
}

type ElementMapping = {
  Heading: HeadingElement
  Button: ButtonElement
  Text: TextElement
  TextArea: TextElement
  YouTube: YouTubeElement
  Label: LabelElement
  Paragraph: ParagraphElement
  TextLink: TextLinkElement
  BlockQuote: BlockQuoteElement
  Image: ImageElement
}

export type ComponentGroup = 'Body' | 'Structure' | 'Typography' | 'Forms' | 'Media' | null
export type AllElementType<T extends NonLayoutComponentName> = T extends keyof ElementMapping
  ? ElementMapping[T]
  : never
export type NonLayoutComponentName = Exclude<ComponentName, 'Body' | 'Block' | 'Flex'>

export type EditorElement<T extends ComponentName = ComponentName> = {
  id: string
  styles: React.CSSProperties
  customStyles?: React.CSSProperties | undefined
  name: ComponentName
  group: ComponentGroup
  content: T extends NonLayoutComponentName ? AllElementType<T> : EditorElement[]
}

export type RecursiveComponent<T extends ComponentName = ComponentName> = EditorElement<T> & {
  index: number
  parentId: string
}

type PrettifyType<T> = {
  [K in keyof T]: T[K]
} & {}
