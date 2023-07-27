---
title: 'Promise'
date: '2021-06-13'
tag: 'Javascript'
description: 'javascript의 비동기 작업을 처리할 때 사용하는 Promise에 대해'
---

> 프로미스는 비동기 작업을 처리할 때 사용되는 객체이다.
> `new Promise(reslove, reject)` > `promise` 는 주로 서버에서 데이터를 받아와 화면에 표시하는 작업에 사용되며, `promise`가 만들어질때, executor(reslove, reject 라는 콜백 함수) 함수는 자동으로 실행된다.

promise 내부 프로퍼티

- `state` : 비동기 처리가 아직 수행되지 않은 상태 `padding` ->
  성공했을 떄 `fulfilled`, 실패했을 때 `reject`
- `result` — 처음엔 `undefined`이었다` resolve(value)`가 호출되면` value`로, `reject(error)`가 호출되면 `error`로 변한다.

### 1. producer(promise object), consumer

producer 객체 만들기

```js
const promise = new Promise((reslove, reject) => {
  console.log('doing somthing')
  setTimeout(() => {
    reslove('ellie')
    // reject(new Error('no network'));
  }, 2000)
})
```

consumers(then, catch, finally)이용해서 producer호출

```js
promise
  .then((value) => {
    console.log(value) // ellie
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    console.log('finally')
  })
```

`.then`(`resolve`일 때)은 (리턴)값을 바로 전달할 수 있고, promise를 전달할수있다.
`.catch` 오류 핸들러
`.finally` 는 성공실패여부에 상관없이 마지막에 실행된다.

### promise chaining

> promise chaining은 `.then`을 이용해 `새로운 Promise`를 연결하여 수행하는 작업

```js
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num - 1)
      }, 2000)
    })
  })
  .then((num) => console.log(num)) // 5
```
