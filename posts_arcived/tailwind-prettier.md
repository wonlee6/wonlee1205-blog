---
title: 'Tailwindcss - Prettier 적용하기'
date: '2024-06-24'
tag: ['tailwindcss', 'prettier']
description: 'Tailwindcss Prettier plugin 사용해서 자동으로 className 정렬하는 방법'
---

## 1. tailwind 설치

```shell
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. prettier plugin 설치

```shell
npm install -D prettier prettier-plugin-tailwindcss
```

## 3. prettier 적용하기

```shell
// .prettierrc
"plugins": ["prettier-plugin-tailwindcss"]
```
