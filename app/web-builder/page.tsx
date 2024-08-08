import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import WebBuilderRoot from '@/components/web-builder'

export default async function WebBuilderRootPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const response = await supabase.from('project').select()

  if (response.error) {
    return <div>Error</div>
  }

  return <WebBuilderRoot projectData={response.data} />
}
