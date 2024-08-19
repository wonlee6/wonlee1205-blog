import { getUserIdInSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/client'
import ProjectRoot from '@/components/web-builder'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function WebBuilderProjectPage() {
  const userId = await getUserIdInSession()

  if (typeof userId === 'undefined') {
    revalidatePath('/')
    redirect(`/web-builder/sign-in`)
  }

  const { data, error } = await createClient().from('project').select().eq('user_id', userId)

  if (error) {
    return <div>Error</div>
  }

  return <ProjectRoot projectData={data} userId={userId} />
}
