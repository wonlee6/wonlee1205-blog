import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { createSession } from '@/lib/session'
import { AuthFormSchemaModel } from '@/model/web-builder'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, password } = body as AuthFormSchemaModel

  const hashedPassword = await bcrypt.hash(password, 10)

  const { error, statusText, data, status } = await createClient()
    .from('member')
    .insert({
      userName: name,
      password: hashedPassword
    })
    .select()
    .single()

  if (error) {
    return new NextResponse('Failed to create user.', {
      status: status,
      statusText: 'Failed to create user.'
    })
  }

  if (statusText) {
    // return redirect(`/web-builder/project/${getProjectData[0].id}`)
    await createSession(data.id, data.name)
    return NextResponse.json(data)
    // return new NextResponse(data, { status: 201 })
  } else {
    return new NextResponse('Failed to create user.', {
      status: 500,
      statusText: 'Failed to create user.'
    })
  }
}
