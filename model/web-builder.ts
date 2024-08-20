import { z } from 'zod'

export const AuthFormSchema = z.object({
  name: z.string().min(4).max(20),
  password: z.string().min(4).max(20)
})

export type AuthFormSchemaModel = z.infer<typeof AuthFormSchema>

export const ProjectFormSchema = z.object({
  user_id: z.string(),
  type: z.literal('add').or(z.literal('edit')),
  projectName: z.string().min(2).max(20),
  description: z.string().max(100),
  selectedItemId: z.string().optional()
})

export type ProjectFormSchemaModel = z.infer<typeof ProjectFormSchema>

export type ProjectData = {
  id: string
  user_id: string
  projectName: string
  description: string
  funnel_page: unknown[]
  created_at: string
  updated_at: string
}

export type ComponentType = '___body' | 'Container' | 'Text' | null

export type ElementType = { href?: string; innerText?: string; src?: string }

export type EditorElement = {
  id: string
  styles: React.CSSProperties
  name: string
  type: ComponentType
  content: EditorElement[] | ElementType
}

type EditorContent = {
  id: string
  elementDetails: {
    componentType: string
    content: EditorContent[] | ElementType
    styles: React.CSSProperties
  }
}
