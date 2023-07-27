---
title: '자주 사용하는 함수들'
date: '2021-10-26'
tag: 'React'
description: '알고 있으면 도움되는 함수들'
---

1. url에 query 붙일 때

```ts
export const getQuery = (_h: string): {[key: string]: any} => {
  let o = {}
  const h = _h.replace(/\?/g, '')
  for (const x of h.split('&')) {
    const k: string = x.split('=')[0],
      v: string = x.split('=')[1]
    o = {...o, [k]: v}
  }
  return o
}
```

2. url query 를 문자열로

```ts
export const queryToString = (_query: {[name: string]: string}) => {
  const searchs = new URLSearchParams()
  for (const x in _query) {
    if (x) {
      searchs.append(x, _query[x])
    }
  }
  return searchs.toString()
}
```

3. 유효성 검사

```ts
/* REGEX */
// 이메일 형식 체크 함수
export const emailRegex = (e: string) => {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
    e
  )
}
// 비밀번호 형식 체크 함수
export const passwordRegex = (e: string) => {
  return e.length < 8
    ? '비밀번호는 최소 8자리 입니다.'
    : !e.replace(/[^a-z]/gi, '').length || !e.replace(/[^0-9]/gi, '').length
    ? '비밀번호는 숫자 , 영문 포함해야합니다.'
    : ''
}
// 날짜 형식 체크 함수
export const dateRegex = (e: string) => {
  return /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/i.test(e)
}
// 특수문자 체크 함수
export const specialRegex = (e: string) => {
  // eslint-disable-next-line no-useless-escape
  return (
    e.replace(
      /[0-9 | a-z | A-Z | ㄱ-힣 | \★ | \☆ | \- | \+ | \( | \) | \, ]/gi,
      ''
    ).length === 0
  )
}
```

4. 콤마

```ts
// 콤마 포맷 10000 -> 10,000
export const comma = (_x: string | number): string => {
  try {
    return _x
      .toString()
      .replace(/,/gi, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } catch {
    return '-'
  }
}
```

5. 날짜 포멧 (moment 있어야 함)

```ts
// YYYY-MM-DD 포맷
export const dateFormat = (e: string): string => {
  return moment(e).format('YYYY-MM-DD')
}
```

6. 분초

```ts
// 분:초 -> second
export const MS2Second = (e: string): number => {
  return e.split(':').reduce((acc: number, current: string, index: number) => {
    // 분의 경우 60초 추가
    if (index === 0) return acc + parseInt(current) * 60
    else return acc + parseInt(current)
  }, 0)
}
// second -> 분:초
export const second2MS = (e: number): string => {
  const minute = Math.floor(e / 60)
  return `${minute}:${numberFormat(e - minute * 60)}`
}
```

7. 중복 제거

```ts
export const deduplicateArray = <A>(array: Array<A>): Array<A> => {
  return array.reduce((acc: Array<A>, current: A) => {
    return acc.includes(current) ? acc : acc.concat(current)
  }, [])
}
```

8. 체크박스

```ts
export const checkboxHandler = <T>(
  action: React.Dispatch<React.SetStateAction<Array<T>>>,
  array: Array<T>,
  value: T
) => {
  if (array.includes(value) && array.length === 1) return
  action(
    array.includes(value)
      ? array.filter((item) => item !== value)
      : array.concat(value)
  )
}
```
