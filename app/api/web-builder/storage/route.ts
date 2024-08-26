import { NextResponse } from 'next/server'

import { getUserSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/client'

export async function POST(request: Request) {
  const session = await getUserSession()

  if (typeof session === 'undefined') {
    return new NextResponse('Error', { status: 500 })
  }

  const response = await request.formData()

  const { data, error } = await createClient()
    .storage.from('images')
    .upload(`web-builder/${session.userName}`, response, { upsert: true })

  if (error) {
    return new NextResponse('Failed to upload an image', { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}
