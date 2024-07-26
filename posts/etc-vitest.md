---
title: 'Vitest 설치, 실행해보기 (vite + react)'
date: '2024-07-26'
tag: 'Etc'
description: 'Vitest + React TDD 맛 보기'
---

## 설치

> 환경: vite + vitest + bun

```
bun i -D vitest jsdom @vitest/coverage-v8 @types/jest @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitest/ui
```

## Config 생성

~~vite.config.ts 아님~~

새로 만들어야 함

```ts
// vitest.config.ts

/// <reference types="vitest" />

import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    // 테스트 환경 설정
    environment: 'jsdom',

    // 테스트 설정 파일
    setupFiles: ['./vitest.setup.ts'],

    // 테스트 파일 필터링 (glob 패턴)
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],

    // 테스트 타임아웃 설정 (기본값: 5000ms)
    testTimeout: 10000,

    // 커버리지 설정
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/'],
      include: ['src/**/*.{js,jsx,ts,tsx}']
    },

    // 기타 설정
    clearMocks: true,
    mockReset: true,
    restoreMocks: true
  }
})
```

`testTimeout` 요놈은 안건드려도 됨

```ts
//vitest.setup.ts

import '@testing-library/jest-dom/vitest'
import {cleanup} from '@testing-library/react'
import {afterEach, beforeEach} from 'vitest'

// 테스트 전후 훅 설정
beforeEach(() => {
  // 각 테스트 전 실행될 코드
  // console.log("Before each test");
})

afterEach(() => {
  // 각 테스트 후 실행될 코드
  // console.log("After each test");
  cleanup()
})
```

`vitest.config.ts` > `setupFiles` 에 넣을 파일도 추가

## 예제 코드 작성

test 폴더를 만든 후, 그 안에 `HelloWorld` 컴포넌트 생성

```tsx
import React from 'react'

interface HelloWorldProps {
  name: string
}

const HelloWorld: React.FC<HelloWorldProps> = ({name}) => {
  return <h1>Hello, {name}!</h1>
}

export default HelloWorld
```

그리고 `HelloWorld.test.tsx` 테스트 컴포넌트 생성

```tsx
import {render, screen} from '@testing-library/react'
import HelloWorld from './HelloWorld'
import {describe, expect, test} from 'vitest'

describe('HelloWorld Component', () => {
  test('renders with the correct name', () => {
    render(<HelloWorld name='Vitest' />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Hello, Vitest!')
  })

  test('renders with a different name', () => {
    render(<HelloWorld name='React' />)
    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('Hello, React!')
  })
})
```

이렇게 하고 나서 `package.json` 으로 다시 돌아와

```json
"scripts": {
    ...
    "coverage": "vitest run --coverage",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
```

스크립트를 작성해준다.

## 테스트 실행

```
bun run test
```

[![2024-07-26-11-26-29.png](https://i.postimg.cc/pdYMfDRg/2024-07-26-11-26-29.png)](https://postimg.cc/rdmHcRdJ)

짜안 위와 같이 확인

### 2번째 예제 실행

또 다른 `PlaceHolderText` 컴포넌트 생성

```tsx
export default function PlaceHolderText() {
  return <input name='sexy' placeholder='Username' />
}
```

마찬가지로 테스트 코드 생성

```tsx
import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import PlaceHolderText from './PlaceHolderText'

describe('placeholder test', () => {
  it('get input', () => {
    render(<PlaceHolderText />)

    const input = screen.getByPlaceholderText('Username')
    expect(input).toHaveAttribute('name', 'sexy')
  })

  it('show input', () => {
    render(<PlaceHolderText />)

    const inputNode = screen.getByPlaceholderText('Username')
    expect(inputNode).toBeVisible()
  })
})
```

> 참고로 it, test 동일

[![2024-07-26-11-42-14.png](https://i.postimg.cc/YqK9zxHS/2024-07-26-11-42-14.png)](https://postimg.cc/pyCR2zyN)

package.json script에서 작성한 `coverage` 실행하게 될 경우 테스트 관련 리포팅 테이블을 확인할 수 있다.

```
bun run coverage
```

~~이 포스팅은 설치 & 동작해 보는 것이 목적~~
