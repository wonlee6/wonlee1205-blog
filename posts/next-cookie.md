---
title: 'Next js에서 jose 라이브러리를 이용해 session(쿠키) 다루기'
date: '2024-08-10'
tag: ['next.js']
description: 'jose 이용해서 session 로직을 만들어보고 middleware도 설정해보기'
---

# JWT, JOSE

JWT(JSON Web Token)는 클라이언트와 서버 간의 인증 및 정보 교환을 위한 표준입니다. JOSE(Javascript Object Signing and Encryption)는 JWT를 다루는 데 사용되는 라이브러리로, 암호화, 서명, 암호화된 메시지의 생성 및 검증에 대한 기능을 제공합니다. 이 글에서는 Next.js와 jose 라이브러리를 사용해 JWT를 쿠키에 저장하고, 이를 처리하는 방법을 설명합니다.

## Create session file

### 1. encrypt(암호화) 함수 생성

JWT를 생성하고 서명하기 위해서는 `jose` 라이브러리의 `SignJWT` 클래스를 이용합니다. JWT는 기본적으로 payload(데이터)와 서명(signature)이 포함됩니다.

`session`을 관리할 파일을 생성합니다.

```ts
// lib/session.ts
import { SignJWT, type JWTPayload } from 'jose'

const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_SESSION_KEY)

export async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}
```

- `encrypt` 함수는 입력된 payload를 JWT로 변환하여 서명한 뒤, JWT 문자열을 반환합니다.
- HS256 알고리즘을 사용하며, 토큰 발행일 설정(빈 인수라면 유닉스 타임스탬프) 그리고 토큰의 유효기간을 `1day`로 설정했습니다.

> key는 `.env.local`에 등록합니다.

만약 2시간으로 설정하고 싶으면 `2h` 변경하면 됩니다.

### 2. decrypt(복호화) 함수 생성

```ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

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
```

- JWT 형식(JWS 컴팩트 형식이어야 함)을 확인하고, JWS 서명을 확인하고, JWT 클레임 세트의 유효성을 검사합니다.

### 3. Create session 함수 생성

`createSession` 함수는 사용자를 위한 세션을 생성하고, 이를 쿠키에 저장하는 역할을 합니다. 이 함수는 사용자의 ID와 세션 만료 시간을 받아, 해당 데이터를 암호화한 후 쿠키에 저장합니다.

```ts
// lib/session.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

const cookie = {
  name: 'session',
  option: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  },
  duration: 24 * 60 * 60 * 1000 // 24시간
}

...

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, expires })
  cookies().set(cookie.name, session, { ...cookie.option, expires } as ResponseCookie)
  redirect(`/web-builder/project/${userId}`)
}
```

- 현재 시간에 쿠키 지속 시간을 더해 `expires`를 만들고, `userId` 와 `expires` 값을 통해 암호화합니다.
- `next/headers`를 통해 가져온 `cookies`에 쿠키를 저장합니다.
- `redirect` 원하는 경로로 이동합니다.

> client component에서 실행할 경우 redirect대신 useRouter를 이용해야 함

### 4. verify Session

`session`을 검증하고 처리하는 함수입니다.

```ts
export async function verifySession() {
  const getCookie = cookies().get(cookie.name)
  if (typeof getCookie === 'undefined') {
    return redirect('/')
  }

  const cook = getCookie.value
  const session = await decrypt(cook)

  if (session?.userId) {
    redirect(`/web-builder/project/${session.userId}`)
  }
  return redirect('/')
}
```

- `cookie`가 없으면 `redirect`로 어디론가? 이동시킵니다.
- `session`이 있고 `userId`가 있으면 다른 페이지로 이동합니다.

유저가 로그인 페이지로 이동했을 때, 로그인하고 나서 보여주는 페이지로 바로 이동한다고 생각하면 됩니다.

### 5. delete session

```ts
export async function deleteSession() {
  cookies().delete(cookie.name)
  redirect('/')
}
```

- `cookie` 삭제합니다.

### 6. component에 연결

예를 들면 Sign in 페이지에 접속할 경우

```tsx
export default async function SignInPage() {
  await verifySession()

  return <AuthClient authType='sign-in' />
}
```

위와 같이 `await verifySession()`를 통해 세션을 검증하거나, 회원가입 페이지에서 `createSession()`함수를 통해 세션을 생성할 수 있습니다.

## middleware

모든 `page.tsx`에서 위에서 만든 session함수를 불러오지 않고, `next.js`에서 지원하는 `middleware`를 이용하면 작업이 좀 더 편해집니다.

```ts
// middleware.ts
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
```

- 특정 `url` 경로에 접속 할 경우, 쿠키가 있는지 확인 후 `redirect` 시키는 로직입니다.
