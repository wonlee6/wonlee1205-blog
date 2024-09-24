import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import EditorClient from '@/components/web-builder/editor/client'
import { createClient } from '@/lib/supabase/client'
import { sleep } from '@/lib/utils'

export default async function WebBuilderEditorPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    revalidatePath('/', 'layout')
    redirect(`/web-builder/sign-in`)
  }

  const {
    data: { contents, projectName, description },
    error
  } = await createClient().from('project').select().eq('id', params.slug).single()

  await sleep(1000)

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

  return <EditorClient data={contents} projectName={projectName} description={description} />
}
