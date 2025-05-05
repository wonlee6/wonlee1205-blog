import { NextResponse } from 'next/server'

import { getUserSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const session = await getUserSession()

  if (typeof session === 'undefined') {
    return new NextResponse('Session Error', { status: 500 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from('images')
    .list(`web-builder/${session.userName}`, { sortBy: { column: 'name', order: 'asc' } })

  if (error) {
    return new NextResponse('Errors while importing images', { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}

export async function POST(request: Request) {
  const session = await getUserSession()

  if (typeof session === 'undefined') {
    return new NextResponse('Session Error', { status: 500 })
  }

  const response = await request.formData()
  const file = response.get('file')

  if (!file || !(file instanceof File)) {
    return new NextResponse('No file or invalid file in request', { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`web-builder/${session.userName}/${file.name}`, file, { upsert: false })

  if (error) {
    return new NextResponse('Failed to upload an image', { status: 500, statusText: error.message })
  }

  return NextResponse.json(data, { status: 200 })
}

export async function DELETE(request: Request) {
  const session = await getUserSession()

  if (typeof session === 'undefined') {
    return new NextResponse('Session Error', { status: 500 })
  }

  const response = await request.json()

  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from('images')
    .remove([`web-builder/${session.userName}/${response.path}`])

  if (error || data.length === 0) {
    return new NextResponse('Failed to delete an image', { status: 500 })
  }

  return new NextResponse('Success to delete an image', { status: 200 })
}
