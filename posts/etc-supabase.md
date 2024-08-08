---
title: 'Supabase 적용해보기'
date: '2024-08-08'
tag: ['supabase', 'next', 'etc']
description: 'Supabase - crud 적용해보기'
---

# Supabase

~~많은 인기가 있다고 해서 한번 다루어 보는 시간~~

> 가이드가 잘 되어 있어서 혼자 시작하기에 무리가 없습니다.

### 기능

- Database
- Authentication
- Edge Functions
- Storage
- Realtime
- Vector

크게 위와 같은 기능이 특징

이번에는 `Database`만 다룰 예정입니다.

## 데이터테이블 생성

[공식 홈페이지](https://supabase.com/)에서 회원 가입을 하고 새로운 프로젝트를 생성
([Quick Start](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs))

아마 처음 회원가입 이후 가이드 따라가면 프로젝트를 만들고 테이블을 만들 수 있습니다.

프로젝트 만들었다는 가정하에 database 만들어 보겠습니다.

Table Editor 또는 SQL Editor 를 통해 만들 수 있는데, Table Editor로 만들겠습니다.
~~SQL 어려워~~

[![2024-08-08-6-15-05.png](https://i.postimg.cc/bvDCRxCH/2024-08-08-6-15-05.png)](https://postimg.cc/v1ytYVdc)

- name: 테이블 명
- description: 테이블 설명
- RLS 체크 박스 풀지 말고
- id: uuid 로 변경후 `primary` 체크

column 목록에 각각

- projectName: text
- description: varchar
- contents: JSON

이렇게 저장하고 만든 테이블로 갑니다

[![2024-08-08-6-20-32.png](https://i.postimg.cc/4NRY4XRJ/2024-08-08-6-20-32.png)](https://postimg.cc/Yj8rbKSV)

데이터를 불러오기 위해 `insert` 통해 데이터를 넣습니다.

[![2024-08-08-6-22-28.png](https://i.postimg.cc/SNGxy8Gr/2024-08-08-6-22-28.png)](https://postimg.cc/Vdd8gJpr)

`projectName`, `description`만 입력하고 저장을 누릅니다.

사진은 created_at 입력되었지만 입력안해도 됨

그리고 왼쪽 설정 목록에서 `Authentication` > `policy` > `create policy`에 들어갑니다.

> rest api method에 대한 보안 정책을 만드는 부분인데 이부분을 생략하면 나중에 API를 사용할 수 없습니다.

[![2024-08-08-6-27-08.png](https://i.postimg.cc/QtMpbhdL/2024-08-08-6-27-08.png)](https://postimg.cc/SXw2Q09V)

오른쪽 템플릿 리스트에서 맨위 `Enable read access for all users`를 누른 후 저장합니다.

> insert, update, delete에 대한 정책도 만들어야 합니다.

## 설치

> Next js 환경에서 테스트

```shell
npm install @supabase/supabase-js @supabase/ssr
```

lib 폴더 내 supabase 파일 생성

```ts
// client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

```ts
// server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  )
}
```

```ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  // refreshing the auth token
  await supabase.auth.getUser()

  return supabaseResponse
}
```

이렇게 3개의 파일을 만든 후

`.env.local`에 supabase 키를 입력합니다.

```shell
// .env.local
NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
```

## Fetch

`Page.tsx`로 이동 후 API 연결후 데이터를 가져오겠습니다.

```tsx
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const response = await supabase.from('project').select()

  return (
    ...
  )
}
```

```js
await supabase.from('project').select()
```

supabase 메소드를 이용하여 `project`라는 테이블을 선택 후(`from`), `select`통해 값을 가져옵니다.

`response`에는 error, data, count, status, statusText 구조로 되어있습니다.

`data`를 살펴보면

```js
// in response
data: [
  {
    id: '1e8a1404-e72a-441b-bde7-e40baee59ca8',
    created_at: '2024-08-08T09:24:18.193392+00:00',
    projectName: 'test projectName',
    contents: null,
    description: 'test description'
  }
]
```

아까 Table Editor에서 만든 데이터를 확인 할 수 있습니다.

> 컴포넌트 만드는 과정은 생략...

## insert

```ts
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (name === '') {
    nameRef.current?.focus()
  }
  if (description === '') {
    descriptionRef.current?.focus()
  }

  const supabase = createClient()

  const response = await supabase
    .from('project')
    .insert({
      projectName: name,
      description
    })
    .select()
}
```

하나의 값만 넣을 경우 객체, 여러 값을 넣을 경우 배열에 넣으면 됩니다.

```js
insert({
    컬럼 이름: 컬럼 값,
    컬럼 이름: 컬럼 값
})
```

이런 식으로 만드면 됩니다. `select`를 통해 만들어진 최종 값을 리턴받아 화면을 업데이트 해주면 됩니다.

## update, delete

```js
const response = await supabase
  .from('project')
  .update({ projectName: name, description })
  .eq('id', id)
  .select()
```

```js
const response = await createClient().from('project').delete().eq('id', id)
```

`insert`와 비슷하지만 `eq`를 통해 `column > id`에서 일치하는 `id`를 찾아 해당 `row`를 업데이트 합니다.

~~단순 CRUD라서 화면은 첨부안했습니다...~~

> 꼭 Policy에 추가하고 진행하세요.

[supabase-javascript docs](https://supabase.com/docs/reference/javascript/introduction)
