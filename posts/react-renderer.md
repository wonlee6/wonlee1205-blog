---
title: 'React - Renderer'
date: '2023-06-25'
tag: 'React'
description: 'React 렌더링 과정에 대해 알아보자'
---

## Mounting

1. Trigger Phase

- State 변경
- 부모 State 변경
- context API의 State 변경

2. Render Phase

- Reconciliation(재조정): 앞으로 그려질 DOM과 그려지기 전 DOM의 부분을 비교해 달라진 부분을 찾아내 계산하는 과정
- Batching: React는 최대한 렌더링을 적게 일으키기 위해 작업을 한번에 묶어서 일괄 처리

3. Commit Phase

- Rendering에서 재조정된 가상 DOM을 DOM에 적용하고 라이프사이클을 실행하는 단계

4. useLayoutEffect  
   -> 브라우저가 화면에 paint 하기 전, useLayoutEffect 함수가 `동기적`으로 실행

5. Paint  
   -> 브라우저가 실제 DOM을 화면에 그린다.

6. useEffect  
   -> Mount되어 화면이 그려진 직후, useEffect에 등록해둔 함수가 `비동기`로 실행된다.

## Re-rendering

1. Trigger Phase

- State 변경
- 부모 State 변경
- context API의 State 변경

2. Render Phase

- 새로운 가상DOM 생성 후, 이전 가상 DOM과 비교하여, 달라진 부분을 탐색하고, 실제 DOM에 반영할 부분을 결정한다.

3. Commit Phase

- 달라진 부분만 실제 DOM에 반영한다.

4. useLayoutEffect

- 브라우저가 화면에 paint 하기 전, useLayoutEffect 함수가 `동기적`으로 실행

5.  Paint

- 브라우저가 실제 DOM을 화면에 그린다.

6.  useEffect

- Mount되어 화면이 그려진 직후, useEffect에 등록해둔 함수가 `비동기`로 실행된다.
- effect에 return부분이 있다면, 구현부보다 먼저 실행된다.

![life cycle](https://wavez.github.io/react-hooks-lifecycle)
