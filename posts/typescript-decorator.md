---
title: 'Method Decorators'
date: '2024-07-23'
tag: ['typescript']
description: 'Typescript DMethod Decorators'
---

# Decorator

## 소개

### 데코레이터란 클래스 및 클래스 멤버에 어노테이션을 달거나 수정하기 위한 기능

데코레이터는 클래스 선언, 메서드, 접근자, 프로퍼티 또는 매개 변수에 첨부할 수 있는 특수한 종류의 선언입니다. 데코레이터는 @expression 형식을 사용합니다. 여기서 expression은 데코레이팅 된 선언에 대한 정보와 함께 런타임에 호출되는 함수여야 합니다.

(타입스크립트 공식 소개 인용글)

```ts
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

먼저 위와 같이 `tsconfig` 설정 진행

## Method Decorators

메서드 데코레이터는 메서드 선언 직전에 선언됩니다. 데코레이터는 메서드의 프로퍼티 설명자(Property Descriptor) 에 적용되며 메서드 정의를 관찰, 수정 또는 대체하는 데 사용할 수 있다.

메서드 데코레이터는 선언 파일, 오버로드 또는 기타 주변 컨텍스트(예: 선언 클래스)에서 사용할 수 없다.

메서드 데코레이터의 표현식은 런타임에 다음 세 개의 인수와 함께 함수로 호출된다.

1. 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
2. 멤버의 이름
3. 멤버의 프로퍼티 설명자

> 참고  스크립트 대상이 ‘ES5’보다 낮은 경우 프로퍼티 설명자 는 ‘undefined’이 됩니다.

메서드 데코레이터가 값을 반환하면, 메서드의 프로퍼티 설명자 로 사용된다.

> 참고  스크립트 대상이 ‘ES5’보다 낮은 경우 반환 값은 무시된다.

### 예제

1. 실행 시간 측정 데코레이터

```ts
function measureExecutionTime(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value

  descriptor.value = async function (...args: any[]) {
    const start = performance.now()
    const result = await method.apply(this, args)
    const end = performance.now()
    console.log(`${propertyName} executed in ${(end - start).toFixed(2)}ms`)
    return result
  }

  return descriptor
}

class DataService {
  @measureExecutionTime
  async fetchData() {
    // Simulate a network request
    return new Promise((resolve) => setTimeout(() => resolve('data'), 1000))
  }
}

const service = new DataService()
service.fetchData() // fetchData executed in 1000.xxms
```

2. 권한 체크

```ts
function authorize(roles: string[]) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = function (...args: any[]) {
      const userRole = this.userRole // Assuming userRole is a property of the class instance
      if (!roles.includes(userRole)) {
        throw new Error('Unauthorized')
      }
      return method.apply(this, args)
    }

    return descriptor
  }
}

class UserService {
  userRole: string

  constructor(role: string) {
    this.userRole = role
  }

  @authorize(['admin'])
  deleteUser(userId: string) {
    console.log(`User ${userId} deleted`)
  }
}

const adminService = new UserService('admin')
adminService.deleteUser('123') // User 123 deleted

const userService = new UserService('user')
try {
  userService.deleteUser('123') // Error: Unauthorized
} catch (e) {
  console.error(e.message) // Unauthorized
}
```

3. 에러 처리

```ts
function handleError(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value

  descriptor.value = async function (...args: any[]) {
    try {
      return await method.apply(this, args)
    } catch (error) {
      console.error(`Error in ${propertyName}:`, error)
      throw error // rethrow the error if needed
    }
  }

  return descriptor
}

class APIService {
  @handleError
  async getData() {
    // Simulate a network request that fails
    return new Promise((_, reject) => setTimeout(() => reject(new Error('Network error')), 1000))
  }
}

const apiService = new APIService()
apiService.getData().catch((e) => console.error('Caught:', e.message)) // Error in getData: Network error, Caught: Network error
```

4. 캐싱

```ts
function cache(duration: number) {
  const cacheStore: { [key: string]: { value: any; expiry: number } } = {}

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const cacheKey = JSON.stringify(args)
      const now = Date.now()

      if (cacheStore[cacheKey] && cacheStore[cacheKey].expiry > now) {
        console.log(`Cache hit for ${propertyName} with args: ${cacheKey}`)
        return cacheStore[cacheKey].value
      }

      const result = await originalMethod.apply(this, args)
      cacheStore[cacheKey] = {
        value: result,
        expiry: now + duration
      }

      console.log(`Cache set for ${propertyName} with args: ${cacheKey}`)
      return result
    }

    return descriptor
  }
}

class ApiService {
  @cache(5000) // 캐시 유효 기간을 5초로 설정
  async fetchData(endpoint: string) {
    console.log(`Fetching data from ${endpoint}`)
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  }
}

// 사용 예제
const apiService = new ApiService()
apiService.fetchData('https://api.example.com/data').then((data) => console.log('Data:', data))

// 동일한 요청을 빠르게 반복하면 캐시된 데이터가 반환됨
setTimeout(() => {
  apiService
    .fetchData('https://api.example.com/data')
    .then((data) => console.log('Data from cache:', data))
}, 3000)
```

> 주의: 데코레이터는 JavaScript에 대한 2단계 제안이며 TypeScript의 실험적 기능
