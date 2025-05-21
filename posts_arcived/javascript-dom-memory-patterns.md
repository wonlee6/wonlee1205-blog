---
title: '메모리 효율적인 DOM 조작 패턴 정리'
date: '2025-04-20'
tag: ['javascript']
description: 'React, Vue 같은 프레임워크를 쓰지 않고 DOM을 직접 다룰 때 꼭 알아야 할 성능 최적화 팁'
---

# 메모리 효율적인 DOM 조작 패턴 정리 (Vanilla JS 기준)

> React, Vue 같은 프레임워크를 쓰지 않고 DOM을 직접 다룰 때 꼭 알아야 할 성능 최적화 팁

---

## 🔍 왜 DOM 조작에서 메모리 효율성이 중요할까?

대부분의 SPA 프레임워크는 내부적으로 많은 DOM 연산과 GC(Garbage Collection)을 발생시킵니다.  
하지만 성능이 중요한 웹앱(VSCode 웹버전처럼)에서는 **직접 DOM을 조작**하여 **더 빠르고 가벼운 UI**를 만들 수 있습니다.

---

## ✨ 핵심 DOM 조작 패턴과 예제

### 1. 기존 DOM 요소 재사용: `display: none`

새로 만들지 말고, 미리 만들어둔 요소를 숨겼다가 다시 보여주는 방식이 훨씬 빠릅니다.

```js
const el = document.getElementById('box')
el.style.display = 'none' // 숨기기
el.style.display = 'block' // 다시 보이기
```

---

### 2. `textContent` vs `innerText`

`textContent`는 스타일 계산 없이 빠르게 텍스트만 추출하는 반면,  
`innerText`는 reflow를 유발하므로 느립니다.

| 속성          | 설명                     | 성능    |
| ------------- | ------------------------ | ------- |
| `textContent` | 텍스트만 가져옴, 빠름    | ✅ 빠름 |
| `innerText`   | 스타일 계산, reflow 유발 | ❌ 느림 |

```js
const fast = el.textContent
```

---

### 3. `insertAdjacentHTML`로 빠르게 HTML 삽입

`innerHTML`은 전체 재파싱이 발생하므로 느립니다.  
`insertAdjacentHTML`은 기존 DOM을 유지하며 빠르게 삽입합니다.

```js
el.insertAdjacentHTML('beforeend', '<li>아이템 추가</li>')
```

---

### 4. `<template>` 태그 + `cloneNode`

템플릿 요소를 HTML에 미리 정의해두고, `cloneNode`로 복사해 사용하는 방식

```html
<template id="card_template">
  <article class="card">
    <h3></h3>
    <section class="content"></section>
  </article>
</template>
```

```js
function createCard(title, content) {
  const tpl = document.getElementById('card_template')
  const card = tpl.content.cloneNode(true).firstElementChild
  card.querySelector('h3').textContent = title
  card.querySelector('.content').textContent = content
  return card
}

document.body.appendChild(createCard('제목', '내용'))
```

---

### 5. 대량 요소 추가 시 `DocumentFragment`

많은 DOM 요소를 반복 삽입할 경우 `DocumentFragment`로 한 번에 처리  
→ DOM 리플로우를 최소화할 수 있음

```js
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li')
  li.textContent = `항목 ${i}`
  fragment.appendChild(li)
}
document.getElementById('myList').appendChild(fragment)
```

---

## 🧠 메모리 누수 방지 패턴

### 1. `WeakMap`으로 DOM ↔ 데이터 연결

DOM 요소가 제거되면 자동으로 GC 대상이 되도록 `WeakMap` 사용

```js
const dataMap = new WeakMap()
const el = document.querySelector('.logo')
dataMap.set(el, { label: 'Frontend Masters' })

el.remove() // 연결된 객체도 GC 처리됨
```

---

### 2. `WeakRef`로 DOM 생존 여부 감지

DOM 요소가 제거되었는지 감지해서 타이머 등 클린업에 사용

```js
class Counter {
  constructor(element) {
    this.ref = new WeakRef(element)
    this.start()
  }

  start() {
    this.count = 0
    this.timer = setInterval(() => {
      const el = this.ref.deref()
      if (!el) {
        clearInterval(this.timer)
      } else {
        el.textContent = ++this.count
      }
    }, 1000)
  }
}
```

---

## ✅ 요약 정리

| 목적                  | 추천 방법                          |
| --------------------- | ---------------------------------- |
| DOM 재사용            | `display: none` 활용               |
| 텍스트 조작           | `textContent` 사용                 |
| HTML 삽입 성능 최적화 | `insertAdjacentHTML`, `<template>` |
| 대량 DOM 삽입         | `DocumentFragment` 사용            |
| 메모리 누수 방지      | `WeakMap`, `WeakRef` 사용          |

---

## 🔗 참고

- 원문: [Patterns for Memory Efficient DOM Manipulation](https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation/)
