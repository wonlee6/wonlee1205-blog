---
title: 'Array Method'
date: '2021-06-13'
tag: 'Javascript'
description: 'javascript의 Array method 소개'
---

## 요소 추가 메서드

- arr.push(...item) = 맨 끝에 요소 추가
- arr.pop() = 맨 끝 요소 삭제
- arr.shift() = 맨 앞 요소 삭제
- arr.unshift(...item) 맨 앞에 요소 추가

### splice

> `arr.splice(startindex, deleteindex, item);`

```js
let arr = ['I', 'study', 'JavaScript']
arr.splice(1, 1) // 인덱스 1부터 요소 한 개를 제거
alert(arr) // ["I", "JavaScript"]
```

```js
const arr = ["i","study","javascript", "right","now"]
arr.splice(2,0"yeah");
console.log(arr) // ["i","study","yeah","javascript","right","now"]
```

splice 메서드의 deleteCount를 0으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 추가할 수 있다.

🕵️‍♂️ 음수도 사용가능 하다

```js
let arr = [1, 2, 5]
// 인덱스 -1부터 (배열 끝에서부터 첫 번째 요소)
// 0개의 요소를 삭제하고
// 3과 4를 추가합니다.
arr.splice(-1, 0, 3, 4)
console.log(arr) // 1,2,3,4,5
```

### slice

> `arr.slice(startindex, endindex);`

```js
let arr = ['t', 'e', 's', 't']
console.log(arr.slice(1, 3)) // e,s (인덱스가 1인 요소부터 인덱스가 3인 요소까지를 복사(인덱스가 3인 요소는 제외))
console.log(arr.slice(-2)) // s,t (인덱스가 -2인 요소부터 제일 끝 요소까지를 복사)
```

splice 와 slice 차이점  
=> splice는 배열을 반환 slice()는 새로운 배열을 만든다.

### concat

> `arr.concat(arg1, arg2...)`  
> 요소를 모아 새로운 배열을 만든다.

```js
const arr = [1, 2, 3, 4, 5]
arr.concat(6, 7)
console.log(arr) // [1,2,3,4,5,6,7]
```

### forEach

> `arr.forEach((item,index, array))`  
> 주어진 함수를 배열 요소 각각에 대해 실행한다.

```js
const arr = [1, 2, 3, 4]
arr.forEach((item, index, array) => {
  item * 2 // [2,4,6,8]
})
console.log(arr)
```

### 배열 탐색하기

1. `arr.indexOf(item, from)`  
   요소를 발견하면 해당 요소의 인덱스를 반환하고, 발견하지 못했으면 -1을 반환한다.
2. `arr.includes(item, from)`  
   from으로부터 item을 찾고 발견하면 true를 반환한다

```js
let arr = [1, 0, false]
console.log(arr.indexOf(0)) // 1
console.log(arr.indexOf(false)) // 2
console.log(arr.indexOf(null)) // -1
console.log(arr.includes(1)) // true
```

🕵️‍♂️ 배열 내 최초의 요소의 인덱스를 반환한다.

```js
let s = 'ksekkset'
for (var i = 0; i < s.length; i++) {
  console.log(i, s[i], s.indexOf(s[i]))
  //  0 "k" 0
  //  1 "s" 1
  //  2 "e" 2
  //  3 "k" 0
  //  4 "k" 0
  //  5 "s" 1
  //  6 "e" 2
  //  7 "t" 7
}
```

요소의 위치를 정확히 알고 싶은게 아니고 요소가 배열 내 존재하는지 여부만 확인하고 싶다면 arr.includes를 사용하는 게 좋습니다.

### find

> 특정 조건에 부합하는 객체를 배열 내에서 찾는다

```js
let users = [
  {id: 1, name: 'John'},
  {id: 1, name: 'Pete'},
  {id: 3, name: 'Mary'}
]
let user = users.find((item) => item.id === 1)
console.log(user.name) // John
```

true 값 하나만 반환, 찾는 요소가 없으면 `undefined` 반환

### filter

> `arr.filter(function(item, index, array)`  
> filter는 find와 문법이 유사하지만, 조건에 맞는 요소 전체를 담은 배열을 반환
> true 값만 리턴

```js
let users = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Pete'},
  {id: 3, name: 'Mary'}
]
// 앞쪽 사용자 두 명을 반환합니다.
let someUsers = users.filter((item) => item.id < 3)
console.log(someUsers.length) // 2
```

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let result = arr.filter((item) => item > 5)
console.log(result) // [6, 7, 8, 9, 10];
```

### map

> `arr.map(function(item, index, array)`  
> 배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 배열로 반환

```js
let kvArray = [
  {key: 1, value: 10},
  {key: 2, value: 20},
  {key: 3, value: 30}
]
let reformattedArray = kvArray.map(function (obj) {
  let rObj = {}
  rObj[obj.key] = obj.value
  return rObj
})
// reformattedArray는 [{1:10}, {2:20}, {3:30}]
// kvArray는 그대로
// [{key:1, value:10},
//  {key:2, value:20},
//  {key:3, value: 30}]
```

### sort

> 배열의 요소를 정렬해줍니다. 배열 자체가 변경됩니다

```js
const arr = [90, 80, 77, 56, 46, 30, 10]
const result = arr.sort((a, b) => b - a)
//오름차순 정렬 후 문자열
console.log(result) // 90,80,77,56,46,30,10
```

> 문자열엔 localeCompare를 사용

```js
let countries = ['Österreich', 'Andorra', 'Vietnam']
console.log(countries.sort((a, b) => a.localeCompare(b)))
// Andorra,Österreich,Vietnam
```

### split(s), Join()

> s 기준으로 쪼갠다.

```js
let names = 'Bilbo, Gandalf, Nazgul'
let arr = names.split(', ')
for (let name of arr) {
  alert(`${name}에게 보내는 메시지`) // Bilbo에게 보내는 메시지
}
// 다른 예시
let str = 'test'
alert(str.split('')) // t,e,s,t
```

```js
let arr = ['Bilbo', 'Gandalf', 'Nazgul']
let str = arr.join(';') // 배열 요소 모두를 ;를 사용해 하나의 문자열로 합칩니다.
alert(str) // Bilbo;Gandalf;Nazgul
```

하나의 문자열로 합친다.

### reduce

> `arr.reduce(function(accumulator, item, index, array) { // ...> }, [initial]);`

- accumulator – 이전 함수 호출의 결과.
- initial은 함수 최초 호출 시 사용되는 초깃값을 나타냄(옵션)
- item – 현재 배열 요소
- index – 요소의 위치
- array – 배열

```js
let arr = [1, 2, 3, 4, 5]
let result = arr.reduce((sum, current) => sum + current, 0)
alert(result) // 15
```

| sum       | current |
| --------- | ------- |
| 0         | 1       |
| 0+1       | 2       |
| 0+1+2     | 3       |
| 0+1+2+3   | 4       |
| 0+1+2+3+4 | 5       |

`0+1+2+3+4+5 = 15`

배열 안 객체의 값 불러오기(중복제거)

```js
const data2 = [
  {a: 'happy', b: 'robin', c: ['blue', 'green']},
  {a: 'tired', b: 'panther', c: ['green', 'black', 'orange', 'blue']},
  {a: 'sad', b: 'goldfish', c: ['green', 'red']}
]
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

🕵️‍♂️ 함수를 인자값으로 받아올수 있다!

> fliter와 비교 예시

```js
const numbers = [1, 2, 3, 4, 5, 6]
// filter
const filteredNumbers = numbers.filter((number) => number % 2 === 0)
console.log(filteredNumbers) // [2, 4, 6]
// filter using reduce
const initialNumbers = []
const filterReducer = (accumulator, item) => {
  if (item % 2 === 0) accumulator.push(item)
  return accumulator
}
const filteredNumbers2 = numbers.reduce(filterReducer, initialNumbers)
console.log(filteredNumbers2) // [2, 4, 6]
```

### 요약

- 요소를 더하거나 지우기
  - push(...items) – 맨 끝에 요소 추가하기
  - pop() – 맨 끝 요소 추출하기
  - shift() – 첫 요소 추출하기
  - unshift(...items) – 맨 앞에 요소 추가하기
  - splice(pos, deleteCount, ...items) – pos부터 deleteCount개의 요소를 지우고, items 추가하기
  - slice(start, end) – start부터 end 바로 앞까지의 요소를 복사해 새로운 배열을 만듬
  - concat(...items) – 배열의 모든 요소를 복사하고 items를 추가해 새로운 배열을 만든 후 이를 반환함. items가 배열이면 이 배열의 인수를 기존 배열에 더해줌
- 원하는 요소 찾기
  - indexOf/lastIndexOf(item, pos) – pos부터 원하는 item을 찾음. 찾게 되면 해당 요소의 인덱스를, 아니면 -1을 반환함
  - includes(value) – 배열에 value가 있으면 true를, 그렇지 않으면 false를 반환함
  - find/filter(func) – func의 반환 값을 true로 만드는 첫 번째/전체 요소를 반환함
  - findIndex는 find와 유사함. 다만 요소 대신 인덱스를 반환함
- 배열 전체 순회하기
  - forEach(func) – 모든 요소에 func을 호출함. 결과는 반환되지 않음
- 배열 변형하기
  - map(func) – 모든 요소에 func을 호출하고, 반환된 결과를 가지고 새로운 배열을 만듦
  - sort(func) – 배열을 정렬하고 정렬된 배열을 반환함
  - reverse() – 배열을 뒤집어 반환함
  - split/join – 문자열을 배열로, 배열을 문자열로 변환함
  - reduce(func, initial) – 요소를 차례로 돌면서 func을 호출함. 반환값은 다음 함수 호출에 전달함. 최종적으로 하나의 값이 도출됨
- 기타
  - Array.isArray(arr) – arr이 배열인지 여부를 판단함
    sort, reverse, splice는 기존 배열을 변형시킨다는 점에 주의하시기 바랍니다.
