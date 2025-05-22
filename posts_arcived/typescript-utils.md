---
title: 'TypeScript 유틸리티 타입 정리'
date: '2024-06-29'
tags: ['typescript']
description: '자주 사용하는 TypeScript 유틸 타입과 설명'
---

TypeScript를 사용할 때 자주 활용할 수 있는 유틸리티 타입들을 정리해봅니다. 실무에서 유용하게 쓰일 수 있는 커스텀 타입들을 중심으로 설명합니다.

---

## 📌 1. `one<T>` — 객체의 각 키를 단독 객체로 분리

```ts
type one<T> = { [P in keyof T]: Record<P, T[P]> }[keyof T]
```

1. `[P in keyof T]` 에서 T는 객체로 가정하기 때문에 P는 T객체의 키 값을 말한다.
2. `Record<P, T[P]>`는 P타입을 키로 갖고, value는 P를 키로 둔 T객체의 값의 레코드 타입
3. 따라서 `{[P in keyof T]: Record<P, T[P]>}` 에서 키는 T 객체의 키 모음이고, value는 해당 키의 원본 객체 T
4. 3번의 타입에서 다시 `[keyof T]` 의 키값으로 접근하기 때문에 최종 전달받은 값은 T

```ts
type User = { name: string; age: number }

// 결과: { name: string } | { age: number }
type OneUser = one<User>
```

> ExcludeOne

```ts
type excludeOne<T> = { [P in keyof T]: Partial<Record<Exclude<keyof T, P>, undefined>> }[keyof T]
```

1. `[P in keyof T]` 에서 T는 객체로 가정하기 때문에 P는 T객체의 키 값을 말한다.
2. `<Exclude<keyof T, P>`는 T객체가 가진 키값에서 P타입과 일치하는 키값을 제외한다. 이 타입을 A라고 하자
3. `Record<A, undefined>` 키로 A타입을, 값으로 `undefined`를 갖는 레코드 타입을 B라고 하자 `{[Key]: undefined}`
4. `Partial<B>`는 옵셔널로 변경 : `{[Key]?: undefined} `

> PickOne

```ts
type PickOne<T> = one<T> & excludeOne<T>
```

> NonNullable - Null or undefined 검사

```ts
type NonNullAble<T> = T extends null | undefined ? never : T
```

```ts
const shopList = shopApiList.filter(NonNullAble)

function NonNullAble<T>(value: T): value is NonNullAble<T> {
  return value !== null && value !== undefined
}
```

> ReadOnly

```ts
type ReadonlyProps<T> = {
  readonly [P in keyof T]: T[P]
}
```

> PrettifyType

```ts
type PrettifyType<T> = {
  [K in keyof T]: T[K]
} & {}

type SubType = PrettifyType<NestedType>
```
