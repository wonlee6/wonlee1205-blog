import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session'

export async function middleware(request: NextRequest) {
  // update user's auth session (supabase)
  await updateSession(request)

  const protectedRoutes = '/web-builder/project'
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = currentPath.includes(protectedRoutes)

  if (isProtectedRoute) {
    const cookie = cookies().get('session')?.value

    if (typeof cookie === 'undefined') {
      return NextResponse.redirect(new URL('/web-builder/sign-in', request.nextUrl))
    }

    if (typeof cookie !== 'undefined') {
      const session = await decrypt(cookie)

      if (!session?.userId) {
        return NextResponse.redirect(new URL('/web-builder/sign-in', request.nextUrl))
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
