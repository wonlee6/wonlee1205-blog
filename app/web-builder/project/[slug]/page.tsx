import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import WebBuilderRoot from '@/components/web-builder'
import { redirect } from 'next/navigation'

export default async function WebBuilderRootPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    redirect('./auth')
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const response = await supabase.from('project').select().eq('user_id', params.slug)

  if (response.error) {
    console.error(response.error)
    return <div>Error</div>
  }

  return <WebBuilderRoot projectData={response.data} projectId={params.slug} />
}
