---
title: '알면 좋은 정보'
date: '2021-06-13'
tag: 'Javascript'
description: '알고 있으면 나름 도움되는 javascript skill'
---

### 1. Default Parameter

> Parameter의 기본값 설정이 가능하다

```js
function voluem(l, w, h) {
  if (w === undefined) {
    w = 2
  }
  if (h === undefined) {
    h = 3
  }
  return l * w * h
}
console.log(voluem(1)) // 6
```

```js
voluemm = (l, w = 2, h = 3) => l * w * h
console.log(voluemm(1)) // 6
```

### 2. Object.entries() / Object.values()

> Object.entries() 는 객체에 담긴 키/값 들을 배열에 짝으로 변환한다.

```js
const credits = {producer: 'John', director: 'Jane', assistant: 'Petter'}
const arr = Object.entries(credits)
console.log(arr)
/*
  [ 'producer', 'John' ],
  [ 'director', 'Jane' ],
  [ 'assistant', 'Peter' ]
*/
```

> Object.values()는 Object.entries()와 같은 기능이지만 키 없이 값만 변환한다.

```js
const arr1 = Object.values(credits)
console.log(arr1)
// [ 'John', 'Jane', 'Peter' ]
```

### 3. Short-circuit evaluation (|| operator)

> If 조건문 없이 값 설정/확인 가능.  
> 연산자 || 기준으로 왼쪽값이 false(undefined, null, '', 0, false 등)일 시 값이 true인 오른쪽값을 리턴한다. (왼쪽값 || 오른쪽값)  
> 즉, 오른쪽에 있는 값을 기본값(default)으로 설정한다고 생각하면 된다.

```js
let person = {
  name: 'Jack',
  age: 34
}
console.log(person.job || 'unemployed') // unemployed
```

```js
person = {
  name: 'Jack',
  age: 34,
  job: 'techer'
}
console.log(person.job || 'unemployed') // techer
```

> 'unemployed'가 true인지 확인하기 전에 person.job이 true이기 때문에 바로 그 값을 리턴한다.

```js
let a
let b = null
let c = undefined
let d = 4
let e = 'five'
let f = a || b || c || d || e
console.log(f) // 4
```

> 4 e까지 도달하기 전에 d가 true이기 때문에 4 출력  
> Null 또는 Undefined일 시 기본값 설정 가능

### 4. Create tally with .reduce()

> 배열 안 각 요소 개수를 객체로 변환하기

```js
const fruitBasket = [
  'Banana',
  'cherry',
  'orange',
  'apple',
  'Banana',
  'cherry',
  'orange',
  'cherry',
  'apple',
  'fig',
  'orange'
]
const count = fruitBasket.reduce((tally, fruit) => {
  if (!tally[fruit]) tally[fruit] = 1
  else tally[fruit]++
  // 다른 방법
  // tally[fruit] = (tally[fruit] || 0) + 1;
  return tally
}, {})
console.log(count) //{Banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1}
```

### 5. Flatten array of arrays with .reduce()

> 중첩배열 평탄화

```js
const data = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const flat = data.reduce((pre, cur) => {
  return pre.concat(cur)
})
console.log(flat) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

> 배열 안, 객체 안에 있는 배열의 정보 가져오기 :

```js
const data2 = [
  {a: 'happy', b: 'robin', c: ['blue', 'green']},
  {a: 'tired', b: 'panther', c: ['green', 'black', 'orange', 'blue']},
  {a: 'sad', b: 'goldfish', c: ['green', 'red']}
]
const colors = data2.reduce((total, amount) => {
  amount.c.forEach((color) => {
    total.push(color)
  })
  return total
}, [])
console.log(colors)
// ['blue','green','green','black','orange','blue','green','red']
```

> 위 코드 중복 제거

```js
const uniqueColors = data2.reduce((total, amount) => {
  amount.c.forEach((color) => {
    if (total.indexOf(color) === -1) {
      total.push(color)
    }
  })
  return total
}, [])
console.log(uniqueColors)
// ["blue", "green", "black", "orange", "red"]
```

### 6. sort, join

> join

```js
const array1 = [10, 80, 30, 46, 56, 77, 90]
const op = array1.filter((pre) => pre >= 50).join()
console.log(op) // 80,56,77,90
// join() 없다면 => [80, 56, 77, 90]
```

> sort

```js
const result = array1.sort((a, b) => b - a).join()
//오름차순 정렬 후 문자열
console.log(result) // 90,80,77,56,46,30,10
```
