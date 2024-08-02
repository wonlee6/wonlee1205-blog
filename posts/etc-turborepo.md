---
title: 'Turborepo 알아보기 (with prettier)'
date: '2024-07-31'
tag: ['turborepo', 'etc']
description: 'Turborepo 설치 및 실습해보고 prettier 적용해보기'
---

# Turborepo

~~Vercel이 인수한 회사~~

> Turborepo는 JavaScript 및 TypeScript 코드베이스를 위한 고성능 빌드 시스템

![image](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhy-turborepo-problem.02c393fb.png&w=828&q=75&dpl=dpl_8vukGbcw8uKPgk7aScsh9QnV9P5h)

## Monorepo 문제점

확장에 어려움을 겪기 때문에 퍼포먼스 저하 이슈가 생길 수 있음

## 솔루션

![image](https://turbo.build/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhy-turborepo-solution.02448c98.png&w=828&q=75&dpl=dpl_8vukGbcw8uKPgk7aScsh9QnV9P5h)

### Turborepo

- 모노레포의 스케일링 문제를 해결함
- 원격 캐시로 동일한 작업을 진행 안함
- 모든 사용 가능한 코어에서 작업을 병렬화하여 최대 속도로 작업을 예약

위 내용은 공식 홈페이지 소개 글을 인용

## 설치

글로벌로 turbo 설치.

```
npm install turbo --global
```

글로벌 말고 단일 레포지에 설치하려면

```
npm install turbo --save-dev
```

- template 사용할 때

디폴트가 nextjs

```
npx create-turbo@latest
```

with tailwind

```
npx create-turbo@latest -e with-tailwind
```

vite

```
npx create-turbo@latest -e with-vite
```

## 구조

`turbo`는 JavaScript 생태계의 패키지 관리자 기능인 Workspaces를 기반으로 구축되었으며, 이를 통해 여러 패키지를 하나의 저장소로 그룹화할 수 있다.

템플릿을 통해 설치가 되고 구조를 살펴보면

[![2024-07-31-144923.png](https://i.postimg.cc/FzwkvcpK/2024-07-31-144923.png)](https://postimg.cc/D4dwdStV)

```json
// root > pacakage.json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

`workspaces`에 어플리케이션과 라이브러리 및 공통으로 사용하는 config 등을 분리

예시

```json
{
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "packageManager": "npm@10.0.0"
}
```

root에 있는 `turbo.json`은 turbo의 동작을 구성하는 데 사용

[참조](https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks)

`package-lock.json`은 turbo가 동작하는데 핵심이며 내부 패키지 간의 종속성을 이해함

## 공통 모듈 추가

### 공통으로 쓸 함수를 만들어서 어플리케이션에서 임포트하는 방법

1. packages 폴더 내 math 폴더 추가
2. math 폴더 내 package.json 추가

```json
{
  "name": "@repo/math",
  "type": "module",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "exports": {
    "./add": {
      "types": "./src/add.ts",
      "default": "./dist/add.js"
    },
    "./subtract": {
      "types": "./src/subtract.ts",
      "default": "./dist/subtract.js"
    }
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "typescript": "latest"
  }
}
```

- `export`: 다른 패키지에서도 사용할 수 있도록 함
- `devDependencies`: 해당 패키지가 사용하는 종속성 선언 (typescript, @repo/typescript-config 등...)

3. tsconfig.json 추가

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

- 위에서 devDependencies > `@repo/typescript-config` 종속성을 선언했기 때문에 해당 파일을 가져올 수 있다.
- `outDir`: TypeScript 컴파일된 곳
- `rootDir`: src 디렉토리와 동일한 구조를 사용하는지 확인

4. src 내 소스 코드 추가

```ts
// ./packages/math/src/add.ts
export const add = (a: number, b: number) => a + b
```

5. 어플리케이션에 추가

```json
// apps/web/package.json
  "dependencies": {
+   "@repo/math": "*",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
```

web > package.json에 `@repo/math` 추가 후

```jsx
// apps/web/src/app/page.tsx
import {add} from '@repo/math/add'

function Page() {
  return <div>{add(1, 2)}</div>
}

export default Page
```

web - 컴포넌트에 `@repo/math/add` 임포트 후 반영

6. turbo.json 수정

```json
"tasks": {
  "build": {
    "dependsOn": ["^build"],
    "outputs": [".next/**", "!.next/cache/**", "dist/**"] // "dist/**" 추가
  },
}
```

turbo는 빌드 할때 output에 정의한 파일(폴더)을 찾아서 빌드함(캐시도)

루트로 돌아와 `turbo build` 실행 후 웹으로 확인할 수 있다.

앞서 위에는 [공식 가이드](https://turbo.build/repo/docs/crafting-your-repository/creating-an-internal-package)에 잘 나와있으므로 참고해서 작업하면 된다.

## Prettier 적용

공통으로 어떤것을 다룰까하다가 Prettier가 생각나서 적용해볼려고 한다.

1. config-prettier 폴더 생성

root > packages > config-prettier

2. prettierrc 파일 생성

> .prettierrc

```json
// packages/config-prettier/.prettierrc
{
  "printWidth": 90,
  "bracketSpacing": true,
  "jsxSingleQuote": true,
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

위와 같이 prettier 정의해주고

3. package.json 생성

```json
{
  "name": "@repo/prettier-config",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": "./.prettierrc"
  }
}
```

4. web 수정

- `.prettierrc` 만들고

```json
// apps/web/.prettierrc
{
  "filepath": "@repo/prettierrc-config"
}
```

- package.json 에서 `@repo/prettier-config` 추가

```json
// apps/web/package.json
...
"devDependencies": {
    "@next/eslint-plugin-next": "^14.2.3",
    "@repo/eslint-config": "*",
    "@repo/tailwind-config": "*",
    "@repo/typescript-config": "*",
    "@repo/prettier-config": "*",
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
```

5. turbo build 실행

컴포넌트를 저장할 때 마다 Prettier 동작하는 것을 확인 할 수 있다.

> vscode option > save on format - on 으로 해야함

## 결론

멀티 레포인 경우 공통으로 사용되는 UI 또는 config 파일 등을 분리하여 Packages 라는 곳에 정의하고
어플리케이션에서 가져와 사용하고 빌드 캐싱도 되기 때문에 정말 좋은 것 같다.

현재 회사에선 멀티레포같은 멀티레포가를 사용하고 있지만, 중복되는 노드 모듈과 다른 레포에 의존적인 부분이 많아서 불편했는데 Turborepo를 사용하고 싸악 치료되었습니다.

~~회사 내에도 도입하고 싶지만...~~
