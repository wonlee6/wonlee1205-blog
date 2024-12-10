import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { decryptFormData } from '@/helper/editor.helper'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request) {
  const response = await request.json()
  const decrtpyData = decryptFormData(response.data)

  const headersList = await headers()
  const referer = headersList.get('referer')

  const projectId = referer?.split('/').at(-1)

  const supabase = await createClient()
  const { error, status } = await supabase
    .from('project')
    .update({ contents: decrtpyData })
    .eq('id', projectId)
    .select()

  if (error) {
    return new NextResponse('An error occurred while updating', {
      status,
      statusText: 'An error occurred while updating'
    })
  }
  return new NextResponse('Update Complete', { status: 200, statusText: 'Update Complete' })
}
