---
title: 'Callback'
date: '2021-06-13'
tag: 'Javascript'
description: 'javascript의 Callback이란?'
---

> 콜백이란 ? 콜백은 다른 함수가 실행을 끝낸 뒤 실행(call back) 되는 함수를 말한다.

```js
function doHomework(subject) {
  alert(`Starting my ${subject} homework.`)
}
doHomework('Math')
```

결과값 : `Starting my math homework.`

여기에 `doHomework()`에 두번째 인자에 `callback`을 넘겨서 콜백함수를 추가해보면

```js
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}
doHomework('Math', function () {
  alert('finished my homework')
})
```

alert 2개가 나옴

👨‍🎓 `callback()` 을 주석으로 막는다면 ? `callback()`함수는 실행되지 않는 것을 알 수 있다.

그리고 함수를 인자로 넘길수 있는데

```js
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}
function finish() {
  alert('finished my homework')
}
doHomework('math', finish)
```

즉, 콜백함수(Callback Function)란 파라미터로 함수를 전달받아, 함수의 내부에서 실행하는 함수이다.

### 동기 비동기

동기적 콜백, 비동기적 콜백 예제

```js
console.log(1) // 1
setTimeout(() => console.log(2), 1000) // 4
console.log(3) // 2
function printImediately(print) {
  print()
}
printImediately(() => console.log('hello')) // 3
function printWithDelay(print, timeout) {
  setTimeout(print, timeout)
}
printWithDelay(() => console.log('async callback'), 1000) // 5
```

순서대로 결과값이 도출되는 것을 확인할 수 있다.

✍ 비동기와 동기적 차이점

- 동기 : 현재 실행중인 코드가 완료된 후 다음 코드 실행
- 비동기 : 현재 실행중인 코드 완료 여부 상관없이 다음 코드 실행

### 콜백 지옥

계속되는 콜백 호출을 통한 작업이 계속 진행될 경우 호출이 중첩되어 코드의 들여쓰기가 깊어져 관리하기 어려워지는데 이를 콜백지옥이라고 부른다.

예제

```js
setTimeout(
  (name) => {
    let coffeeList = name
    console.log(coffeeList)
    setTimeout(
      (name) => {
        coffeeList += ', ' + name
        console.log(coffeeList)
        setTimeout(
          (name) => {
            coffeeList += ', ' + name
            console.log(coffeeList)
            setTimeout(
              (name) => {
                coffeeList += ', ' + name
                console.log(coffeeList)
              },
              500,
              'Latte'
            )
          },
          500,
          'Mocha'
        )
      },
      500,
      'Americano'
    )
  },
  500,
  'Espresso'
)
```

0.5초 마다 콜백 호출되어 결과 값은

```
Espresso
Espresso, Americano
Espresso, Americano, Mocha
Espresso, Americano, Mocha, Latte
```

위와 같은 콜백 지옥은 가독성이 떨어지게 되고 관리하기 어려워진다.

가독성을 위해 조금 수정해보자면

```js
const espresso = () => {
  setTimeout(
    () => {
      console.log('espresso')
    },
    americano(),
    500
  )
}
const americano = () => {
  setTimeout(
    () => {
      console.log('Americano')
    },
    mocha(),
    500
  )
}
const mocha = () => {
  setTimeout(
    () => {
      console.log('Mocha')
    },
    latte(),
    500
  )
}
const latte = () => {
  setTimeout(() => {
    console.log('Latte')
  }, 500)
}
espresso()
```

위와 같이 깊은 중첩을 수정할 수 있지만, `promise`, `async/await`를 통해 좀 더 효율적으로 다룰 수 있다.
