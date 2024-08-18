import ProjectRoot from '@/components/web-builder'
import { createClerkSupabaseClient } from '@/lib/supabase/clerk-server'
import { ProjectData } from '@/model/web-builder'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function WebBuilderProjectPage() {
  const user = await currentUser()

  if (!user) {
    revalidatePath('/')
    // redirect('/web-builder/sign-in')
    return
  }

  let userId = ''
  let responseError = null

  const { data, status, error } = await createClerkSupabaseClient()
    .from('member')
    .select()
    .match({ user_id: user.id })
    .single()

  userId = data ? data.id : ''
  responseError = error

  if (status === 406) {
    const { data, error } = await createClerkSupabaseClient()
      .from('member')
      .insert({
        username: user.username,
        user_id: user.id
      })
      .select()
      .single()

    responseError = error
    userId = data ? data.id : ''
  }

  const { data: project } = await createClerkSupabaseClient()
    .from('project')
    .select()
    .eq('member_id', userId)

  if (responseError) {
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl font-bold'>Server Error</h1>
        <Link className='rounded-md bg-red-300 p-4 hover:bg-red-500' href='/web-builder/sign-in'>
          Return Sign In Page
        </Link>
      </div>
    )
  }
  return <ProjectRoot projectData={project as ProjectData[]} memberId={userId} />
}
