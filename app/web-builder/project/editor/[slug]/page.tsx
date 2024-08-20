import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import EditorClient from '@/components/web-builder/editor/client'
import { sleep } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export default async function WebBuilderEditorPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    redirect('./auth')
  }

  await sleep(1000)

  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)

  const response = await createClient().from('project').select().eq('id', params.slug)

  // if (response.error) {
  //   return (
  //     <div className='flex w-full flex-col items-center justify-center gap-4'>
  //       <h1 className='text-5xl font-bold'>Server Error</h1>
  //       <Link className='rounded-md bg-red-300 p-4 hover:bg-red-500' href='/web-builder/sign-in'>
  //         Return Sign In Page
  //       </Link>
  //     </div>
  //   )
  // }

  // return <EditorClient data={response.data} />
  return <EditorClient />
}
