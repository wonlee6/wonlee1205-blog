import { deleteSession } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  await deleteSession()
  return new NextResponse('Logout', { status: 200 })
}
