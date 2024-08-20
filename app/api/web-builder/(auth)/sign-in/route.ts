import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { createSession } from '@/lib/session'
import { AuthFormSchemaModel } from '@/model/web-builder'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, password } = body as AuthFormSchemaModel

  const { statusText, error, data } = await createClient()
    .from('member')
    .select()
    .match({ userName: name })
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
      await createSession(data.id, data.name)
      return NextResponse.json(data)
    }
  }
  return new NextResponse('User not found.', { status: 500, statusText: 'fetch error' })
}
