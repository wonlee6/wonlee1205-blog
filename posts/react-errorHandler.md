---
title: 'Error Handler'
date: '2021-10-26'
tag: 'React'
description: 'Error Handler를 공통 모듈로 만드는 방법'
---

## error module

```ts
export const errorHandler = async (
  error: Error | AxiosError,
  fn: () => Promise<void>,
  callback?: () => void
) => {
  if (isAxiosError(error)) {
    // 서버 오류인지 클라이언트 오류인지 확인
    if (error.response?.data.code === 401) {
      // 서버쪽 401오류 라면
      const ok = await tokenRefresh() // --- 코드 실행
      if (ok) {
        await fn()
      } else {
        console.log(error, fn, window.location)
        window.location.replace('/')
      }
    } else {
      alert(error.response?.data.message)
    }
  } else {
    if (callback) {
      callback()
    }
  }
}
```

함수 자체를 파라미터로 받아 올 경우 `fn: () => void`, promise 라면 `fn: () => promise<void>`

```ts
const userData = async () => {
  await API.account // 예시
    .getUserData()
    .then((res) => console.log(res))
    .catch(async (err) => await ErrorHandler(err, userData))
}
```

에러 핸들러에 프로미스로 선언했기에, async await 사용
