import { deleteSession } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  deleteSession()
  return new NextResponse('delete session', { status: 200 })
}
