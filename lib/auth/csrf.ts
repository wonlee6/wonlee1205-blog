// import { cookies } from 'next/headers'
// import { NextRequest } from 'next/server'

// import { generateToken, verifyToken } from './jwt'

// const CSRF_TOKEN_COOKIE = 'csrf_token'
// const CSRF_HEADER = 'x-csrf-token'

// export async function generateCsrfToken(): Promise<string> {
//   const token = await generateToken({ type: 'csrf' })
//   cookies().set(CSRF_TOKEN_COOKIE, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict'
//   })
//   return token
// }

// export async function validateCsrfToken(request: NextRequest): Promise<boolean> {
//   const storedToken = cookies().get(CSRF_TOKEN_COOKIE)?.value
//   const headerToken = request.headers.get(CSRF_HEADER)

//   if (!storedToken || !headerToken) {
//     return false
//   }

//   try {
//     const isValid = await verifyToken(headerToken)
//     return isValid && storedToken === headerToken
//   } catch {
//     return false
//   }
// }
