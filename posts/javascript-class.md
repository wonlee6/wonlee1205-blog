---
title: 'Class 내보내는 방식에 따른 인스턴스 차이점'
date: '2024-07-22'
tag: 'Javascript'
description: 'Class 내보내는 방식에 따라 인스턴스가 어떻게 생성되는지 알아보는 시간'
---

# Class

`javascript`에서 자주 class를 자주 접하게 되고 이 class 를 내보내는 방식에 따라 나타나는 차이점에 대해 알아보는 시간

## 외부에서 인스턴스 생성

```js
class Person {
  constructor(name) {
    this.name = name
  }
}

export default Person

// anotherFile.js
import Person from './person'

const personInstance = new Person('Jane')
console.log(personInstance.name) // "Jane"
```

- 매번 새로운 인스턴스를 생성되며 각 인스턴스는 독립적으로 동작
- 초기화 비용이 인스턴스 생성 시마다 발생합니다.
- 모듈 간 독립적인 인스턴스를 필요로 할 때 유리

## 모듈 내에서의 인스턴스 생성과 공유 (공유 인스턴스)

```js
// person.js
class Person {
  constructor(name) {
    this.name = name
  }
}

export const testPerson = new Person('John')

// anotherFile.js
import {test} from './person'

console.log(test.name) // "John"
```

- Person 클래스는 모듈 내에서 인스턴스화되고 testPerson 상수로 export 된다.
- 인스턴스를 한 번 생성후 해당 인스턴스를 동일하게 계속 사용한다.
- 메모리 사용량이 적고 초기화 비용이 한 번만 발생
- 인스턴스를 여러 모듈에서 공유해야 할 때 유리

## 결론

### 일반적으로 단일 인스턴스를 여러 모듈에서 공유할 필요가 있을 때는 export const ... = new Person()이 더 효율적이며, 각 모듈에서 독립적인 인스턴스를 필요로 할 때는 외부에서 new Person() 방식을 사용하는 것이 좋다.
