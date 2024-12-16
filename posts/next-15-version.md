---
title: 'Nextjs 15버전 학습'
date: '2024-12-17'
tag: ['next.js']
description: '14버전에서 15버전으로 마이그레이션 및 변경점에 대한 학습'
---

# Nextjs 15버전 학습

## 14버전에서 15버전으로 마이그레이션 및 변경점에 대한 학습

최근 Nextjs가 15버전으로 업데이트하면서 여러가지 변경되었다. 오랜만에 학습할 겸 정리해보자.

먼저 설치

```shell
# Use the new automated upgrade CLI
npx @next/codemod@canary upgrade latest

# ...or upgrade manually
npm install next@latest react@rc react-dom@rc
```

현재 `15.1.0` 버전까지 stable되어있음.

### Breaking change

1. `headers`, `cookies`, `params`, `searchParams` -> asynchronous

```ts
import { cookies } from 'next/headers'

export async function AdminPanel() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  // ...
}
```

~~사용하는 위치~~

#### `params`: layout.js, page.js, route.js, default.js, generateMetadata, and generateViewport

#### `searchParams`: page.js

2. Cache

### 14버전까지 기본적으로 캐싱되었지만, 15버전부터는 캐싱을 원할 때만 작동되도록 변경됨

~~이거때문에 짜증났었는데 다행이 사용자들의 피드백을 빠르게 수용해서 좋군~~

3. React

### React 19버전에 대한 지원을 시작했다고 함, 물론 React 18버전과 호환성은 유지

4. After API

```tsx
import { after } from 'next/server'
import { log } from '@/app/utils'

export default function Layout({ children }) {
  // Secondary task
  after(() => {
    log()
  })

  // Primary task
  return <>{children}</>
}
```

#### 기본 응답을 차단하지 않고 사용자에게 응답 스트리밍이 완료된 후 로깅, 분석 및 기타 시스템 동기화와 같은 작업을 수행할 수 있는 방법을 제공한다고 함

## 기타

1. React Compiler

### 실험적인 기능이지만 사용가능하다 함

2. 에러 로그를 좀 더 개선해서 보여준다고 함

3. Form Component

```tsx
// Note: This is abbreviated for demonstration purposes.
// Not recommended for use in production code.

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Form(props) {
  const action = props.action
  const router = useRouter()

  useEffect(() => {
    // if form target is a URL, prefetch it
    if (typeof action === 'string') {
      router.prefetch(action)
    }
  }, [action, router])

  function onSubmit(event) {
    event.preventDefault()

    // grab all of the form fields and trigger a `router.push` with the data URL encoded
    const formData = new FormData(event.currentTarget)
    const data = new URLSearchParams()

    for (const [name, value] of formData) {
      data.append(name, value as string)
    }

    router.push(`${action}?${data.toString()}`)
  }

  if (typeof action === 'string') {
    return <form onSubmit={onSubmit} {...props} />
  }

  return <form {...props} />
}
```

#### 페이지 이동 및 검색 결과 페이지 이동할 때 유용하다고 함

### 특징

- Prefetching: `layout`, `loading ui` 미리 가져옴(화면에 form이 보일 때)
- Client-side Navigation: `onSubmit` 함수 사용하면 layout과 클라이언트 상태를 공유할 수 있다고 함
- Progressive Enhancement: JavaScript가 아직 로드되지 않은 경우에도 양식은 전체 페이지 탐색을 통해 작동함

4. eslint v9 지원

5. forbidden and unauthorized (실험적 기능)

- forbidden(): 403 error
- unauthorized(): 401 error

```tsx
import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'

export default async function AdminPage() {
  const session = await verifySession()

  // Check if the user has the 'admin' role
  if (session.role !== 'admin') {
    forbidden()
  }

  // Render the admin page for authorized users
  return <h1>Admin Page</h1>
}
```

```tsx
// app/forbidden.tsx
import Link from 'next/link'

export default function Forbidden() {
  return (
    <div>
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
```

#### ... 좀 더 있지만 생략

### [next15-1](https://nextjs.org/blog/next-15-1)

### [next15](https://nextjs.org/blog/next-15)
