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

  const { status, error, data } = await supabase.from('member').select('*').eq('name', name)
  if (error) {
    return new NextResponse('Failed to fetch user.', { status: 500 })
  }

  if (status === 200) {
    if (data && data.length > 0) {
      const user = data[0]
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return new NextResponse('Invalid credentials.', { status: 401 })
      }
      await createSession(user.id)
      return NextResponse.json({ data })
    }
  }
  return new NextResponse('User not found.', { status: 404 })
}
