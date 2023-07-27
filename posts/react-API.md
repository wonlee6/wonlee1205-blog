---
title: 'API 통신'
date: '2021-11-14'
tag: 'React'
description: 'React의 API통신은 어떻게 할까? 기본적인 통신 방법에 대한 정리 글'
---

# API

보통 service 안에 api 구조를 만든다.

예를 들면 학생 API 경우 구조

service - api.ts  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| - student - model - (API 통신 데이터 타입 명시) get-student-response-data-model.ts  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| -- student.ts  
page - student.tsx

### 기본적인 데이터 불러오기

```ts
// student.ts  (API)
export const student = {
  // student 정보 가져오기
  async getStudent() {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/student`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
    return await axios(config)
  }
}
// student.tsx
const getStudent = async () => {
  await API.student
    .getStudent()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
```

위 코드를 보면

1. `${BASE_URL}` 로 url이 변경되더라도 바로 대처 가능하기에 편하다.
2. 타입스크립트는 config의 axios의 타입을 명시해줘야 하는데, `AxiosRequestConfig` 이거 하나로 다 해도 상관없는듯...
3. 보통 API 통신 할 때 헤더에 접근 토큰을 넘긴다.
4. async await 사용한다는 점?

### 수정이나 등록 할 때

GET과 다르게 param 또는 body 부분에 보낼 데이터를 같이 넘겨줘야 한다.

POST 경우 보통 body에 넘기는데

```ts
async postStudent(request : studentDataModel) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/student`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: data
    }
    return await axios(config)
  },
```

axios 라면 data에 넘겨주면 된다.

만약 param에 넘겨야 한다면 ?

```ts
async postStudent(request : studentDataModel) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/student`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: request
    }
    return await axios(config)
  },
```

검색 시 값이 있을 수도 있고 없을 수도 있다면?

```ts
async postStudent(request? : studentDataModel) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/student/${request}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
    return await axios(config)
  },
```

이제 그만 알아보자
