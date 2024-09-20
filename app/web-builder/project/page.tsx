// import { createClient } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import ProjectRoot from '@/components/web-builder'
import { getUserSession } from '@/lib/session'

// export const revalidate = 0

// const supabase = createClient()

export default async function WebBuilderProjectPage() {
  // noStore()

  const session = await getUserSession()

  if (typeof session === 'undefined') {
    revalidatePath('/', 'layout')
    redirect(`/web-builder/sign-in`)
  }

  // const { data, error } = await getProjectData(userId)
  // console.log('시발-----------------------------', data)

  // if (error) {
  //   return <div>Error</div>
  // }

  // const { data, error } = await getProjectData(userId)

  return <ProjectRoot userId={session.userId} />
  // return <ProjectRoot userId={userId} />
}
/*
    캐싱 문제로 클라이언트에서 처리
 */
// async function getProjectData(userId: string) {
//   return await supabase
//     .from('project')
//     .select()
//     .eq('user_id', userId)
//     .order('projectName', { ascending: true })
// }
