import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import { decryptFormData } from '@/helper/editor'
import { createSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/server'
import { AuthFormSchemaModel } from '@/types/web-builder'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, password } = decryptFormData<AuthFormSchemaModel>(body.data)

  const supabase = await createClient()
  const { statusText, error, data, status } = await supabase
    .from('member')
    .select()
    .match({ user_name: name })
    .single()

  if (error) {
    return new NextResponse('User not found.', {
      status: 500,
      statusText: 'User not found.'
    })
  }

  if (statusText) {
    if (data) {
      const isMatch = await bcrypt.compare(password, data.password)

      if (!isMatch) {
        return new NextResponse('Invalid credentials.', {
          status: 401,
          statusText: 'Invalid credentials.'
        })
      }
      await createSession(data.id, data.user_name)
      return new NextResponse('success', { status })
    }
  }
  return new NextResponse('User not found.', { status: 500, statusText: 'fetch error' })
}
