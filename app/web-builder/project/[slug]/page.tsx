import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { ProjectData } from '@/model/web-builder'
import ProjectRoot from '@/components/web-builder'
import { verifyMemberSession } from '@/lib/session'
import Link from 'next/link'

export default async function WebBuilderProjectPage({ params }: { params: { slug: string } }) {
  const { data, error } = await getProject(params.slug)

  if (error) {
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl font-bold'>Server Error</h1>
        <Link className='rounded-md bg-red-300 p-4 hover:bg-red-500' href='/web-builder/sign-in'>
          Return Sign In Page
        </Link>
      </div>
    )
  }
  return <ProjectRoot projectData={data as ProjectData[]} projectId={params.slug} />
}

const getProject = async (path: string) => {
  await verifyMemberSession(path)

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return await supabase.from('project').select().match({ user_id: path })
}
