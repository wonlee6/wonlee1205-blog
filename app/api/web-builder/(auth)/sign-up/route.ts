import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import { decryptFormData } from '@/helper/editor'
import { createSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/server'
import { AuthFormSchemaModel } from '@/types/web-builder'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, password } = decryptFormData<AuthFormSchemaModel>(body.data)

  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(name, password)
  const supabase = await createClient()
  const { error, statusText, data, status } = await supabase
    .from('member')
    .insert({
      user_name: name,
      password: hashedPassword
    })
    .select()
    .single()

  if (error) {
    if (status === 409) {
      return new NextResponse('An already existing username.', {
        status: status,
        statusText: 'An already existing username.'
      })
    }
    return new NextResponse('Failed to create user.', {
      status: status,
      statusText: 'Failed to create user.'
    })
  }

  if (status === 200 || status === 201) {
    await createSession(data.id, data.user_name)
    return new NextResponse('Success sign-up', { status })
  } else {
    return new NextResponse('Failed to create user.', {
      status: 500,
      statusText: 'Failed to create user.'
    })
  }
}
