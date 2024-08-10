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

  const { error, status, data } = await supabase
    .from('member')
    .insert({
      name: name,
      password: hashedPassword
    })
    .select()

  if (error) {
    return new NextResponse('Failed to create user.', { status: 500 })
  }

  if (status === 201) {
    // 동작안함
    // return redirect(`/web-builder/project/${getProjectData[0].id}`)
    await createSession(data[0].id)
    return NextResponse.json({ data })
    // return new NextResponse(data, { status: 201 })
  } else {
    return new NextResponse('Failed to create user.', { status: 500 })
  }
}
