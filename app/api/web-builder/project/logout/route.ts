import { NextResponse } from 'next/server'

import { deleteSession } from '@/lib/session'

export async function POST(request: Request) {
  await deleteSession()
  return new NextResponse('Logout', { status: 200 })
}
