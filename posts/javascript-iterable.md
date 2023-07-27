---
title: 'Iterable Iterator'
date: '2021-06-13'
tag: 'Javascript'
description: 'Iterable이 어떤건지, Iterator가 무엇인지 간략한 소개'
---

> 🕵️‍♂️ iterable = 반복가능한, 배열을 일반화한 객체 - 대표적으로 배열, 문자열

```js
let range = {
  from: 1,
  to: 5
}
```

위의 `range` 객체를 iterable로 만들려면 `symbol.iterator([Symbol.iterator])` 메서드를 추가해야 한다.

```js
let range = {
  from: 1,
  to: 5,
};
// 1. for..of 최초 호출 시, Symbol.iterator 호출
range[Symbol.iterator] = function() {
    // Symbol.iterator는 이터레이터 객체 반환
    // 2. for..of 는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음값도 정해진다.
    return {
        current: this.from,
        last: this.to
    }
    // 3. for..of 반복문에 의해 반복마다 next()가 호출
    next() {
        // 4. next()는 값을 객체 {done: .., value:...} 형태로 반환해야 한다.
        if(this.current <= this.last) {
            return { done : false, value: this.current++}
        } else {
            return {done: true}
        }
    }
}
for (let num of range) {
    console.log(num); // 1, then, 2,3,4,5
}
```

❗ 이터러블 객체의 핵심은 '관심사의 분리(SoC)'

- range엔 메서드 next()가 없음
- 대신 `range[Symbol.iterator]()`를 호출해서 만든 ‘이터레이터’ 객체와 이 객체의 메서드 next()에서 반복에 사용될 값을 만듬

```js
{
    next() {
      	return {value: 1, done: true};
    }
}
```

> 정리

1. next라는 키를 갖는다.
2. 값으로 인자를 받지 않고, `IteratorResultObject`를 반환하는 함수가 온다.
3. `IteratorResultObject`는 value와 done이라는 key를 가지고 있다.
4. done은 계속 반복할지 안할지 boolean 값을 갖는다

> Symbol.iterator 메서드를 가진 객체를 반복 가능(이터러블, iterable)한 객체  
> 이터레이터(iterator) 객체와 이터러블한(iterable) 객체는 서로 다른 개념의 객체  
> 이터레이터는 next 메서드를 가지는 반면에, 이터러블한 객체는 Symbol.iterator(이터레이터 심벌) 메서드를 가지기 때문

### 문자열은 이터러블이다

```js
for (let char of 'test') {
  console.log(char) // t,e,s,t
}
```

### ❗이터러블과 유사 배열

비슷해 보이지만 다른 용어 두 가지

- 이터러블(iterable)은 Symbol.iterator가 구현된 객체
- 유사 배열(array-like)은 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체
