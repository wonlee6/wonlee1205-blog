---
title: 'Web Browser Storage'
date: '2024-07-07'
tag: 'Etc'
description: 'Web browser storage(client 저장소)에 대해 알아보자'
---

# Web Browser Storage

Web browser storage (client 저장소) 에는

1. Local Storage
2. Session Storage
3. IndexedDB

이렇게 나눌 수 있는데 하나하나 조금씩 설명을 하면.

## Local Storage

### 특징

- 영구 저장: 데이터는 브라우저를 닫고 다시 열어도 유지됩니다.
- 저장 용량: 일반적으로 도메인당 약 5-10MB의 데이터를 저장할 수 있습니다.
- 데이터 형식: 문자열 형태로만 데이터를 저장할 수 있습니다. 다른 형식의 데이터를 저장하려면 JSON 문자열로 변환해야 합니다.
- 동기적: 데이터 저장 및 조회 작업이 동기적으로 수행됩니다.
- 보안: 같은 도메인 내의 모든 스크립트가 저장된 데이터에 접근할 수 있습니다.

### 사용 방법

```js
// 데이터 저장
localStorage.setItem('key', 'value')

// 데이터 조회
const value = localStorage.getItem('key')

// 데이터 삭제
localStorage.removeItem('key')

// 모든 데이터 삭제
localStorage.clear()
```

## Session Storage

### 특징

- 세션 단위 저장: 데이터는 탭이나 브라우저 창을 닫을 때까지만 유지됩니다. 새로 열린 탭이나 창은 별도의 세션 스토리지를 가집니다.
- 저장 용량: 일반적으로 도메인당 약 5-10MB의 데이터를 저장할 수 있습니다.
- 데이터 형식: 문자열 형태로만 데이터를 저장할 수 있습니다.
- 동기적: 데이터 저장 및 조회 작업이 동기적으로 수행됩니다.
- 보안: 같은 탭/창 내의 모든 스크립트가 저장된 데이터에 접근할 수 있습니다.

### 사용 방법

```js
// 데이터 저장
sessionStorage.setItem('key', 'value')

// 데이터 조회
const value = sessionStorage.getItem('key')

// 데이터 삭제
sessionStorage.removeItem('key')

// 모든 데이터 삭제
sessionStorage.clear()
```

## IndexedDB

### 특징

- 비관계형 데이터베이스: 키-값 쌍으로 데이터를 저장하며, 트랜잭션과 인덱스를 지원합니다.
- 대용량 저장: 수백 MB에서 수 GB까지 데이터를 저장할 수 있습니다.
- 데이터 형식: JavaScript 객체 형태로 다양한 타입의 데이터를 저장할 수 있습니다.
- 비동기적: 데이터 저장 및 조회 작업이 비동기적으로 수행됩니다.
- 보안: 같은 도메인 내의 모든 스크립트가 저장된 데이터에 접근할 수 있습니다.

```js
// 데이터베이스 열기 또는 생성
const request = indexedDB.open('myDatabase', 1)

request.onupgradeneeded = (event) => {
  const db = event.target.result
  if (!db.objectStoreNames.contains('myStore')) {
    db.createObjectStore('myStore', {keyPath: 'id'})
  }
}

request.onsuccess = (event) => {
  const db = event.target.result

  // 데이터 추가
  const transaction = db.transaction('myStore', 'readwrite')
  const store = transaction.objectStore('myStore')
  const addRequest = store.add({id: 1, name: 'John Doe', age: 30})

  addRequest.onsuccess = () => {
    console.log('Data added successfully')
  }

  addRequest.onerror = () => {
    console.error('Error adding data')
  }

  // 데이터 조회
  const getRequest = store.get(1)
  getRequest.onsuccess = () => {
    const data = getRequest.result
    console.log('Data retrieved:', data)
  }

  getRequest.onerror = () => {
    console.error('Error retrieving data')
  }
}

request.onerror = (event) => {
  console.error('Database error:', event.target.error)
}
```

## 주요 차이점 요약

1. 저장 기간:
   - 로컬 스토리지: 브라우저를 닫아도 데이터가 유지됨.
   - 세션 스토리지: 브라우저 탭 또는 창을 닫을 때 데이터가 삭제됨.
   - IndexedDB: 브라우저를 닫아도 데이터가 유지됨.
2. 저장 용량:
   - 로컬 스토리지: 약 5-10MB.
   - 세션 스토리지: 약 5-10MB.
   - IndexedDB: 수백 MB에서 수 GB.
3. 데이터 형식:
   - 로컬 스토리지: 문자열.
   - 세션 스토리지: 문자열.
   - IndexedDB: 다양한 데이터 타입의 JavaScript 객체.
4. 동기/비동기:
   - 로컬 스토리지: 동기적.
   - 세션 스토리지: 동기적.
   - IndexedDB: 비동기적.

## 결론

### 어떤 스토리지 방법을 사용할지는 애플리케이션의 요구사항에 따라 다릅니다. 예를 들어, 소량의 설정 정보나 사용자 기본 설정을 저장할 때는 로컬 스토리지를 사용하는 것이 간편할 수 있으며, 대용량 데이터를 저장하고 검색해야 할 때는 IndexedDB를 사용하는 것이 적합합니다. 세션 스토리지는 세션 동안만 필요한 데이터를 저장할 때 유용합니다.
