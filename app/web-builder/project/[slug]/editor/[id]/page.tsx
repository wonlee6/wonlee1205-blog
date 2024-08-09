import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditorClient from '@/components/editor/client'

export default async function WebBuilderEditorPage({
  params
}: {
  params: { slug: string; id: string }
}) {
  if (!params.slug || !params.id) {
    redirect('./auth')
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const response = await supabase.from('project').select('*').eq('id', params.id)

  if (response.error) {
    console.error(response.error)
    return <div>Error</div>
  }

  return <EditorClient data={response.data} />
}
