import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { ProjectData } from '@/model/web-builder'
import ProjectRoot from '@/components/web-builder'

export default async function WebBuilderProjectPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from('project').select().eq('user_id', params.slug)

  return <ProjectRoot projectData={data as ProjectData[]} projectId={params.slug} />
}
