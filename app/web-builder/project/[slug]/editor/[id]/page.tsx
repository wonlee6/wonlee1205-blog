import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditorClient from '@/components/editor/client'
import Link from 'next/link'

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
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl font-bold'>Server Error</h1>
        <Link className='rounded-md bg-red-300 p-4 hover:bg-red-500' href='/web-builder/sign-in'>
          Return Sign In Page
        </Link>
      </div>
    )
  }

  return <EditorClient data={response.data} />
}
