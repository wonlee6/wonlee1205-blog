import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { decryptFormData, encryptFormData } from '@/helper/editor'
import { getUserSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/server'
import { ProjectFormSchemaModel } from '@/types/web-builder'

export async function GET(request: Request) {
  const session = await getUserSession()

  const supabase = await createClient()
  const { data, error, status, statusText } = await supabase
    .from('project')
    .select()
    .eq('user_id', session!.userId)
    .order('page_name', { ascending: true })

  console.log(error, statusText)
  if (error) {
    return new NextResponse(statusText, { status })
  }
  return NextResponse.json({ data: encryptFormData(JSON.stringify(data)) }, { status: 200 })
}

export async function POST(request: Request) {
  const response = await request.json()

  const { page_name, description, user_id } = decryptFormData<ProjectFormSchemaModel>(response.data)

  const supabase = await createClient()
  const { data, error, status } = await supabase
    .from('project')
    .insert({
      page_name,
      description,
      user_id
    })
    .select()
    .single()

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
}

export async function PATCH(request: Request) {
  const response = await request.json()
  const { page_name, description, selectedItemId } = decryptFormData<ProjectFormSchemaModel>(
    response.data
  )

  const supabase = await createClient()
  const { error, status, data } = await supabase
    .from('project')
    .update({ page_name, description, updated_at: new Date().toISOString() })
    .eq('id', selectedItemId)
    .select()
    .single()

  if (status === 409) {
    return new NextResponse('Duplicate project name', {
      status: status,
      statusText: 'Duplicate project name'
    })
  }

  if (error) {
    return new NextResponse('An error occurred while updating', {
      status: status,
      statusText: 'An error occurred while updating'
    })
  }
  return NextResponse.json({ data: encryptFormData(JSON.stringify(data)) }, { status: status })
}

export async function DELETE(request: Request) {
  const response = await request.json()

  const { id } = decryptFormData<{ id: string }>(response.data)

  const supabase = await createClient()
  const { error, statusText, status } = await supabase.from('project').delete().eq('id', id)

  if (error) {
    return new NextResponse('An error occurred while deleting', {
      status: 500,
      statusText: 'An error occurred while deleting'
    })
  }
  if (status === 204) {
    return new NextResponse('You have successfully deleted the project.', {
      status: 200,
      statusText: 'You have successfully deleted the project.'
    })
  }
  return new NextResponse(statusText, {
    status: 500,
    statusText
  })
}
