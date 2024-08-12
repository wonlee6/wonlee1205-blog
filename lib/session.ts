import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { revalidatePath } from 'next/cache'
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

export async function createSession(userId: string, name: string) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, name, expires })
  cookies().set(cookie.name, session, { ...cookie.option, expires } as ResponseCookie)
  // redirect(`/web-builder/project/${userId}`)
}

export async function verifySession() {
  const getCookie = cookies().get(cookie.name)
  if (typeof getCookie === 'undefined') {
    return undefined
  }

  const cook = getCookie.value
  const session = await decrypt(cook)

  if (session?.userId) {
    revalidatePath('/', 'layout')
    redirect(`/web-builder/project/${session.userId}`)
  }
}

export async function deleteSession() {
  cookies().delete(cookie.name)
  // redirect('/web-builder/sign-in')
}

export async function verifyMemberSession(userId: string) {
  const getCookie = cookies().get(cookie.name)
  if (typeof getCookie === 'undefined') {
    return undefined
  }

  const cook = getCookie.value
  const session = await decrypt(cook)

  if (session?.userId !== userId) {
    revalidatePath('/', 'layout')
    redirect(`/web-builder/sign-in?return`)
  }
}
