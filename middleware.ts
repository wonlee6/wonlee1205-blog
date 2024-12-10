// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { decrypt } from './lib/session'
import { updateSession } from './lib/supabase/middleware'

// const isProtectedRoute = createRouteMatcher([
//   '/web-builder/sign-in(.*)',
//   '/web-builder/sign-up(.*)'
// ])

// const isProtectedRoute = createRouteMatcher(['/web-builder/project(.*)'])

// export default clerkMiddleware((auth, request) => {
//   // if (!isProtectedRoute(request)) {
//   //   auth().protect()
//   // }

//   if (!auth().userId && isProtectedRoute(request)) {
//     return auth().redirectToSignIn()
//   }
// })

// export default clerkMiddleware()

export async function middleware(request: NextRequest) {
  // update user's auth session (supabase)
  await updateSession(request)

  const protectedRoutes = '/web-builder/project'
  const currentPath = request.nextUrl.pathname
  const isProtectedRoute = currentPath.includes(protectedRoutes)

  if (isProtectedRoute) {
    const cookie = (await cookies()).get('session')?.value

    // if (typeof cookie === 'undefined') {
    //   return NextResponse.redirect(
    //     new URL(`/web-builder/sign-in/${request.nextUrl.pathname}`, request.nextUrl)
    //   )
    // }

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
  // matcher: [
  //   // Skip Next.js internals and all static files, unless found in search params
  //   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  //   // Always run for API routes
  //   '/(api|trpc)(.*)'
  // ]
}
