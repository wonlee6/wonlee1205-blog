import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_SESSION_KEY)

const cookie = {
  name: 'session',
  option: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  },
  duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session: string | Uint8Array): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId: string, userName: string) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, userName, expires })
  cookies().set(cookie.name, session, { ...cookie.option, expires } as ResponseCookie)
  // redirect(`/web-builder/project/${userId}`)
}

export async function verifySession() {
  const getCookie = cookies().get(cookie.name)
  if (typeof getCookie === 'undefined') {
    return
  }

  const cook = getCookie.value
  const session = await decrypt(cook)

  if (session?.userId) {
    redirect(`/web-builder/project`)
  }
}

export async function deleteSession() {
  cookies().delete(cookie.name)
  // redirect('/web-builder/sign-in')
}

export async function getUserSession(): Promise<{ userId: string; userName: string } | undefined> {
  const cookie = cookies().get('session')?.value

  if (!cookie) {
    return undefined
  }

  const session = await decrypt(cookie)

  if (!session) {
    return undefined
  }
  return {
    userId: session.userId as string,
    userName: session.userName as string
  }
}
