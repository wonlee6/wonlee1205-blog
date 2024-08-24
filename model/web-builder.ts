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

export type ComponentName = 'Body' | 'Container' | 'Text' | 'Button' | null
export type ComponentGroup = 'Body' | 'Layout' | 'Element' | null
export type ElementType = { href?: string; innerText?: string; src?: string }

export type EditorElement = {
  id: string
  styles: React.CSSProperties
  customStyles?: React.CSSProperties | undefined
  name: ComponentName
  group: ComponentGroup
  content: EditorElement[] | ElementType
}

export type RecursiveComponent = EditorElement & {
  index: number
  parentId: string
}

type EditorContent = {
  id: string
  elementDetails: {
    componentType: string
    content: EditorContent[] | ElementType
    styles: React.CSSProperties
  }
}
