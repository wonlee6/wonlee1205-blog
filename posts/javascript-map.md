---
title: 'Map and Set'
date: '2021-06-17'
tag: 'Javascript'
description: 'Array Method가 아닌 Map과 Set에 대한 정리'
---

## Map

> Map은 Key와 value로 이루어져 있다
> Map.메서드 종류

- `new Map()` 맵을 만든다
- `map.set(key, value)` key를 이용해 value를 저장한다
- `map.get(key)` key해당하는 값을 반환한다. 없으면 undefined 반환
- `map.has(key)` key가 존재하는지 true,false 반환
- `map.delete(key)` key에 해당하는 값 삭제
- `map.clear()` 맵 안의 모든 요소 제거
- `map.size `요소의 개수 반환

예시

```js
const arr = 'BACBACCACCBDEDE'
let map = new Map() // 1. 맵 만들고
for (let i of arr) {
  if (map.has(i)) {
    map.set(i, map.get(i) + 1) // 3. 있으면 카운트
  } else map.set(i, 1) // 2. 없으면 key i와 1을 넣는다
}
let max = Number.MIN_SAFE_INTEGER
// 반복문돌면서 큰값찾기
for (const [key, value] of map) {
  // key와 value 쌍을 대상으로 반복문
  if (value > max) {
    max = value
    answer = key
  }
}
```

## Set

> 셋(Set)은 중복을 허용하지 않는 값을 모아놓으며, key없이 저장됨
> Set.메서드 종류

- `new Set` - 셋 생성
- `set.add(value)` – 값을 추가하고 셋 자신을 반환합니다.
- `set.delete(value)` – 값을 제거합니다. 호출 시점에 셋 내에 값이 - - 있어서 제거에 성공하면 true, 아니면 false를 반환합니다.
- `set.has(value)` – 셋 내에 값이 존재하면 true, 아니면 false를 반환합니다.
- `set.clear()` – 셋을 비웁니다.
- `set.size` 셋에 몇 개의 값이 있는지

중복제거

```js
function unique(arr) {}
let values = [
  'Hare',
  'Krishna',
  'Hare',
  'Krishna',
  'Krishna',
  'Krishna',
  'Hare',
  'Hare',
  ':-O'
]
console.log(unique(values))
```

```js
function unique(arr) {
  return Array.from(new Set(arr))
}
```
