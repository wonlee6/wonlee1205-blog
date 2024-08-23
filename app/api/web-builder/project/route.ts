import { decryptFormData, encryptFormData } from '@/helper/editor.helper'
import { deleteSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/client'
import { ProjectFormSchemaModel } from '@/model/web-builder'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await deleteSession()
  return new NextResponse('Logout', { status: 200 })
}

export async function POST(request: Request) {
  const response = await request.json()

  const {
    type,
    projectName,
    description,
    user_id,
    selectedItemId = ''
  } = decryptFormData<ProjectFormSchemaModel>(response.data)

  if (type === 'add') {
    const { data, error, status } = await createClient()
      .from('project')
      .insert({
        projectName,
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

  const { data, error, status } = await createClient()
    .from('project')
    .update({ projectName, description, updated_at: new Date().toISOString() })
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
  console.log('id', id)

  const { error, statusText, status } = await createClient().from('project').delete().eq('id', id)
  console.log(error, statusText, status)

  if (error) {
    revalidatePath('/web-builder/project')
    return new NextResponse('An error occurred while deleting', {
      status: 500,
      statusText: 'An error occurred while deleting'
    })
  }
  if (status === 204) {
    revalidatePath('/web-builder/project')
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
