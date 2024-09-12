import { z } from 'zod'

export const AuthFormSchema = z.object({
  name: z.string().min(4, { message: 'ID must contain at least 4 character(s)' }).max(20),
  password: z.string().min(4, { message: 'Password must contain at least 4 character(s)' }).max(20)
})

export type AuthFormSchemaModel = z.infer<typeof AuthFormSchema>

export const PageFormSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  page_name: z.string().min(2).max(50),
  description: z.string().max(250),
  contents: z.string(),
  path: z.string(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true })
})

export type PageFormSchemaModel = z.infer<typeof PageFormSchema>

export const ProjectFormSchema = z.object({
  user_id: z.string(),
  type: z.literal('add').or(z.literal('edit')),
  projectName: z.string().min(2).max(20),
  description: z.string().max(100),
  selectedItemId: z.string().optional()
})

export type ProjectFormSchemaModel = z.infer<typeof ProjectFormSchema>

export type FunnelPage = {
  name: string
  id: number
}

export type ProjectData = {
  id: string
  user_id: string
  projectName: string
  description: string
  funnel_page: string
  created_at: string
  updated_at: string
}

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
  | 'Flex'
  // Typography
  | 'Heading'
  | 'Paragraph'
  | 'Text Link'
  | 'Block Quote'
  // Forms
  | 'Label'
  | 'Text'
  | 'Text Area'
  | 'Button'
  // Media
  | 'Image'
  | 'YouTube'
  | null

export type ComponentGroup = 'Body' | 'Structure' | 'Typography' | 'Forms' | 'Media' | null

type HeadingElement = {
  text: string
  heading: number
}

type ButtonElement = {
  href: string
  innerText: string
}

type TextElement = {
  id: string
  maxLength?: number
}

type YouTubeElement = {
  url: string
  mute: boolean
  loop: boolean
  autoplay: boolean
  showControls: boolean
}

export type AllElementType = Partial<HeadingElement & ButtonElement & TextElement & YouTubeElement>
type NonLayoutComponentName = Exclude<ComponentName, 'Flex' | 'Body'>

export type EditorElement<T extends ComponentName = ComponentName> = {
  id: string
  styles: React.CSSProperties
  customStyles?: React.CSSProperties | undefined
  name: ComponentName
  group: ComponentGroup
  content: T extends NonLayoutComponentName ? AllElementType : EditorElement[]
}

export type RecursiveComponent<T extends ComponentName = ComponentName> = EditorElement<T> & {
  index: number
  parentId: string
}

type PrettifyType<T> = {
  [K in keyof T]: T[K]
} & {}
