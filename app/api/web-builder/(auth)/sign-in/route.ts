import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { createClient } from '@/lib/supabase/client'
import { createSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, password } = body

  if (!name || !password) {
    return new NextResponse('Name and password are required.', { status: 500 })
  }

  const supabase = createClient()

  const { statusText, error, data } = await supabase
    .from('member')
    .select()
    .match({ name })
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
