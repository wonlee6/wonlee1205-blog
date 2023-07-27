---
title: 'Reduce'
date: '2021-06-20'
tag: 'Javascript'
description: '사용하는 사람의 역량에 따라 차이가 나는 Reduce에 대한 정리 글'
---

> reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
> ![reduce](https://www.freecodecamp.org/news/content/images/2019/10/folding-box.gif)

옛 방식

```js
const add = (x, y) => x + y
const numbers = [1, 2, 3, 4, 5]
let total = 0
for (let i = 0; i < numbers.length; i++) {
  total = add(total, numbers[i])
}
console.log(total) // 15
```

`reduce`를 이용한다면

```js
const add = (x, y) => x + y
const numbers = [1, 2, 3, 4, 5]
numbers.reduce(add) // 15
number.reduce((acc, val) => acc + val) // 15
```

`reduce`를 deep하게 알아보기전에 유명한 친구인` map`, `filter`를 알아보는 것도 중요합니다

![reduce](https://www.freecodecamp.org/news/content/images/2019/10/creepy-reduce.jpeg)

`map`, `filter`, `reduce` 3개를 자유자재로 다룬다면 뭐든지 할 수 있습니다.

![reduce](https://www.freecodecamp.org/news/content/images/2019/10/the-big-three.jpeg)

예를 들면 `users` 객체에서 `age`의 합을 어떻게 구할까요?

```js
const users = [
  {name: 'Marie', age: 25},
  {name: 'Ken', age: 22},
  {name: 'Sara', age: 29},
  {name: 'Geoff', age: 30}
]
```

`map`, `filter`는 오직 배열만 리턴할수있지만, 우리는` number`만 필요하빈다.

```js
const users = [
  {name: 'Marie', age: 25},
  {name: 'Ken', age: 22},
  {name: 'Sara', age: 29},
  {name: 'Geoff', age: 30}
]
const reducer = (total, currentUser) => {
  console.log('current total:', total)
  console.log('currentUser:', currentUser)

  // just for spacing
  console.log('\n')

  return total + currentUser.age
}
users.reduce(reducer, 0)
```

![](https://www.freecodecamp.org/news/content/images/2019/10/reduce-screenshot-1.png)

Array.reduce는 2개의 파라미터를 갖고 있는데

1. reducer
2. 초기 값 (선택)

redcuer 는 모든 작업을 실행하는 함수이고, 작성한 코드를 반복합니다. reduce 는 2개의 파라미터를 가지고 있는데.

1. An accumulator 누산기
2. The current value 현재 값

누산기는 최종 반환 값입니다.
사용자를 반복 할 때 총 연령을 어떻게 추적하고 있습니까? 그것을 유지하려면 카운터 변수가 필요합니다. 그것이 누산기입니다. 그것이 끝날 때 최종 가치 감소가 뱉어 낼 것입니다.

루프의 모든 단계에서 마지막 누산기와 현재 항목을 감속기에 공급합니다. 감속기가 반환하는 것이 무엇이든 다음 누산기가됩니다. 목록이 완료되고 하나의 감소 된 값이 있으면주기가 종료됩니다.

![](https://www.freecodecamp.org/news/content/images/2019/10/reduce-screenshot-1.png)

초기 값은 선택 사항입니다.
`reduce` 두 번째 매개 변수는 초기 값입니다. 이를 제공하지 않으면 `reduce`는 기본값을 목록의 첫 번째 요소로 합니다.

일반 숫자를 합산하는 경우 괜찮습니다.

```js
;[1, 2, 3].reduce((total, current) => total + current)
// 6
```

그러나 객체 또는 배열을 사용하면 이러한 것들을 추가해서는 안되기 때문에 중단됩니다.

```js
;[{age: 1}, {age: 2}, {age: 3}].reduce((total, obj) => total + obj.age)

// [object Object]23
// Broken result, use an initial value.
```

이럴 떄는 반드시 초기값을 0으로 해줘야합니다.

```js
;[{age: 1}, {age: 2}, {age: 3}].reduce((total, obj) => total + obj.age, 0)

// 6
// Initial value fixes it.
// 0 + 1 + 2 + 3 = 6
```

속성으로 객체 분류하기

```js
var people = [
  {name: 'Alice', age: 21},
  {name: 'Max', age: 20},
  {name: 'Jane', age: 20}
]
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}
var groupedPeople = groupBy(people, 'age')
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

[출처](https://www.freecodecamp.org/news/learn-reduce-in-10-minutes/)
