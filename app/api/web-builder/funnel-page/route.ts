import { NextResponse } from 'next/server'

import { decryptFormData, encryptFormData } from '@/helper/editor.helper'
import { getUserSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/client'
import { FunnelPageSchemaModel, ProjectFormSchemaModel } from '@/model/web-builder'

export async function GET(request: Request) {
  const session = await getUserSession()

  const { data, error, status, statusText } = await createClient()
    .from('page')
    .select()
    .eq('user_id', session!.userId)

  if (error) {
    return new NextResponse(statusText, { status })
  }
  return NextResponse.json({ data: encryptFormData(JSON.stringify(data)) }, { status: 200 })
}

export async function POST(request: Request) {
  const response = await request.json()
  console.log(response)
  const { user_id, contents, page_name, description } = decryptFormData<FunnelPageSchemaModel>(
    response.data
  )

  const { data, error, status } = await createClient()
    .from('page')
    .insert({
      user_id,
      contents,
      page_name: 'test111',
      description
    })
    .select()
    .single()

  console.log(data, status, error)
  if (status === 409) {
    return new NextResponse('Duplicate project name', {
      status: status,
      statusText: 'Duplicate project name'
    })
  }
  if (error) {
    return new NextResponse('An error occurred while adding', {
      status: status,
      statusText: 'An error occurred while adding'
    })
  }
  return NextResponse.json({ data: encryptFormData(JSON.stringify(data)) }, { status: status })

  //   const { data, error, status } = await createClient()
  //     .from('project')
  //     .update({ projectName, description, updated_at: new Date().toISOString() })
  //     .eq('id', selectedItemId)
  //     .select()
  //     .single()

  //   if (status === 409) {
  //     return new NextResponse('Duplicate project name', {
  //       status: status,
  //       statusText: 'Duplicate project name'
  //     })
  //   }

  //   if (error) {
  //     return new NextResponse('An error occurred while updating', {
  //       status: status,
  //       statusText: 'An error occurred while updating'
  //     })
  //   }
  //   return NextResponse.json({ data: encryptFormData(JSON.stringify(data)) }, { status: status })
}
