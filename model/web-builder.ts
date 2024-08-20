import { z } from 'zod'

export const AuthFormSchema = z.object({
  name: z.string().min(4).max(20),
  password: z.string().min(4).max(20)
})

export type AuthFormSchemaModel = z.infer<typeof AuthFormSchema>

export type ProjectData = {
  id: string
  created_at: string
  projectName: string
  description: string
  contents: unknown
  user_id: string
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
