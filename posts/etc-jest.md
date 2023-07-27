---
title: 'Jest 사용법'
date: '2023-04-25'
tag: 'Etc'
description: 'Jest 사용하는 방법'
---

Jest를 이용하여 알고리즘 문제를 풀어 보자

## 1. 설치

```
$ npm i -D jest babel-jest @babel/core @babel/preset-env
```

`Jest`와 ES6를 위하여 `Babel` 설치

## 2. 설정

jest.config.js

```
module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: [
    "<rootDir>/**/*.test.(js|jsx|ts|tsx)",
    "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
```

babel.config.js

```
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
```

package.json에 추가 script 작성

```
"scripts": {
    "test": "jest",
    "watch": "watch": "jest --watch"
},
```

test: 한 번 실행  
watch: 실행 유지

## 3. 파일 작성

> 파일명.test.js 형식으로 작성

## 4. 예제

함수 모듈을 정의 한다

```js
// 폰켓몬.js
function solution(nums) {
  const length = nums.length / 2

  const result = nums.reduce((acc, cur) => {
    if (!acc.find((i) => i === cur)) {
      acc.push(cur)
    }
    return acc
  }, [])

  if (result.length > length) {
    return length
  } else {
    return result.length
  }
}

module.exports = solution
```

정의한 모듈을 가져온다

```js
// 폰켓몬.test.js
const solution = require('./폰켓몬') // js 파일명

test('폰켓몬', () => {
  const nums = [3, 1, 2, 3]
  expect(solution(nums)).toBe(2)
  // toBe, toEqual 등 결과값을 미리 입력해줘야함
})
```

> 참고: ToBe는 원하는 값, toEqual은 객체나 배열을 깊은 비교

### 실행

```
npm run watch ./폰켓몬.test.js
```
