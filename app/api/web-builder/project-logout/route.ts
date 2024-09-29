import { NextResponse } from 'next/server'

import { deleteSession } from '@/lib/session'

export async function POST(request: Request) {
  await deleteSession()
  const url = request.headers.get('origin')
  return NextResponse.redirect(url + '/web-builder/sign-in')
}
