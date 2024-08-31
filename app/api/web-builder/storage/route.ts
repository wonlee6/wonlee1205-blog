import { NextResponse } from 'next/server'

import { getUserSession } from '@/lib/session'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
  const session = await getUserSession()

  if (typeof session === 'undefined') {
    return new NextResponse('Session Error', { status: 500 })
  }

  const { data, error } = await createClient()
    .storage.from('images')
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
  let name = ''
  if (file instanceof File) {
    name = file.name
  }

  const { data, error } = await createClient()
    .storage.from('images')
    .upload(`web-builder/${session.userName}/${name}`, response, { upsert: false })

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

  const { data, error } = await createClient()
    .storage.from('images')
    .remove([`web-builder/${session.userName}/${response.path}`])

  if (error || data.length === 0) {
    return new NextResponse('Failed to delete an image', { status: 500 })
  }

  return new NextResponse('Success to delete an image', { status: 200 })
}
