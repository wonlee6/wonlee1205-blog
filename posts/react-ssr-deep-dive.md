---
title: 'React 개발자를 위한 SSR 심화 가이드'
date: '2025-04-20'
tag: ['react']
description: 'CSR의 한계를 극복하고 SSR, 프리렌더링, SSG의 개념과 적용을 실제 코드와 함께 학습하기'
---

# React 개발자를 위한 SSR 심화 가이드

> CSR의 한계를 극복하고 SSR, 프리렌더링, SSG의 개념과 적용을 실제 코드와 함께 학습하기

---

## 🔎 왜 No-JavaScript 환경이 중요한가?

대부분의 사용자는 JavaScript를 끄지 않지만, **검색 엔진 크롤러**나 **소셜 미디어 미리보기**는 JS 없이 HTML만 읽습니다.  
이러한 환경에서 올바른 HTML을 제공하지 않으면 검색 결과 노출이나 미리보기가 제대로 되지 않을 수 있습니다.

---

## 🛠️ CSR의 한계

- 초기 HTML은 `<div id="root"></div>` 형태로 비어 있음
- 콘텐츠는 JS 로드 후 렌더됨 → JS가 실행되지 않으면 아무것도 안 보임
- SEO, 소셜 미리보기에 불리함

---

## ✅ 해결: SSR, 프리렌더링, SSG 도입

### 1. 서버 프리렌더링 (Server Pre-rendering)

정적 HTML을 서버에서 미리 생성하고 요청 시 반환합니다.  
기존 HTML 파일을 문자열로 읽어 `title` 등을 동적으로 교체 가능:

```ts
const html = fs.readFileSync('index.html').toString()
const modifiedHTML = html.replace(
  '<title>Vite + React + TS</title>',
  `<title>Study project: Home</title>`
)
return c.html(modifiedHTML)
```

라우트마다 title을 다르게 처리하려면:

```ts
const getTitleFromPath = (pathname: string) => {
  if (pathname.startsWith('/settings')) return 'Study project: Settings'
  if (pathname === '/login') return 'Study project: Login'
  return 'Study project'
}
```

---

### 2. SSR (Server Side Rendering)

- 각 요청 시점에 서버에서 React를 렌더링하여 HTML을 동적으로 생성
- ReactDOMServer API 사용 (`renderToString`, `renderToPipeableStream`)
- SEO, 소셜 미리보기 최적
- 단점: 서버 리소스 비용 증가

---

### 3. SSG (Static Site Generation)

- 빌드 시점에 모든 페이지를 HTML로 생성
- 빠르지만 변경이 필요한 경우 재빌드 필요
- `Next.js`, `Astro`, `Eleventy` 등에서 활용

---

## 💡 Hydration이란?

- 서버에서 보낸 HTML에 JS를 다시 연결하여 인터랙티브하게 만드는 과정
- 초기 로드 속도는 빠르지만 Hydration 비용은 존재

```js
useEffect(() => {
  updateTitle('Study project: Home')
}, [])
```

이 코드처럼 JS 실행 후 타이틀 변경 시 **짧은 깜빡임(flash)** 발생 가능

---

## 📦 실습 프로젝트

- GitHub: [SSR Study Project](https://github.com/developerway/ssr-deep-dive)
- `npm install`, `npm run build`, `npm run start` 로 실행
- `ngrok`으로 외부 노출 후 소셜 미디어에서 테스트 가능

---

## 🧠 정리

| 방식       | 장점                         | 단점                        |
| ---------- | ---------------------------- | --------------------------- |
| CSR        | 인터랙션에 유리              | SEO, 초기 로딩 성능 낮음    |
| SSR        | SEO에 강력, 콘텐츠 즉시 표시 | 서버 부담, 복잡도 증가      |
| SSG        | 빠르고 배포 용이             | 동적 콘텐츠 반영 어려움     |
| Pre-render | 간단한 SEO 대응              | 범용성 부족, 수동 조작 필요 |

---

## 🔗 참고

- 원문: [SSR Deep Dive for React Developers](https://www.developerway.com/posts/ssr-deep-dive-for-react-developers)
