import bcrypt from 'bcrypt'
import { createClient } from '@/lib/supabase/client'
import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { name, password } = body

  if (!name || !password) {
    return new NextResponse('Name and password are required.', { status: 500 })
  }

  const supabase = createClient()

  const hashedPassword = await bcrypt.hash(password, 10)

  const { error, statusText, data, status } = await supabase
    .from('member')
    .insert({
      name: name,
      password: hashedPassword
    })
    .select()
    .single()

  if (error) {
    return new NextResponse('Failed to create user.', {
      status: status,
      statusText: 'Duplicate name'
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
