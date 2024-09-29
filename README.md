# Read me

> Blog, Chart, Web Builder



### [HomePage](https://wonlee1205-blog.vercel.app/)

## Blog

### Front-end 관련 학습한 내용을 정리

## Chart

> ECharts, Monaco Editor를 이용해서 Chart 구현

[![2024-09-01-2-27-19.png](https://i.postimg.cc/3x47w53M/2024-09-01-2-27-19.png)](https://postimg.cc/QF3v6zBS)

차트 종류에 따라 차트 리스트를 보여주는 화면

[![2024-09-01-2-28-29.png](https://i.postimg.cc/nLqJv4s0/2024-09-01-2-28-29.png)](https://postimg.cc/HJWRm79y)

선택한 차트에 대한 정보를 보여주며, `Monaco Editor`를 통한 결과 값으로 차트 구현

[![2024-09-01-2-28-41.png](https://i.postimg.cc/k4hfGZnZ/2024-09-01-2-28-41.png)](https://postimg.cc/XGdwDsBc)

`Prettier` 라이브러리를 사용하여 차트 옵션을 코드 정렬

- 기술 스택
  - React, Next (app router), typescript
  - tailwindcss, next ui
  - ECharts, Monaco Editor
  - Prettier

## Web Builder
> Drag and Drop 으로 웹 디자인을 쉽게!

### Login
![image](https://github.com/user-attachments/assets/c37c073f-27f5-46f4-a05e-5dec21f09b19)
- supabase - email 통한 회원 관리 기능을 사용하려 했지만 유료 기능이기에 아이디와 암호화된 비밀번호로 테이블에 저장

### Project
![image](https://github.com/user-attachments/assets/1bac84f9-b8d7-47ab-a2d8-fde59e521b46)
Landing page를 저장하는 목적으로 crud 구현

### Editor
![image](https://github.com/user-attachments/assets/c91c4cb5-8b3a-4281-917c-fc7641a8303e)
앞서 `Go to Page` 버튼을 통해 들어오게 되면 처음마주하는 화면

#### Toolbox
![image](https://github.com/user-attachments/assets/9a2570d2-5710-4c49-b3cb-9f4fb7483876)
- 왼쪽부터 선택한 프로젝트 이름, 설명
- 가운데: Desktop, tablet, mobile 사이즈로 변경하는 버튼
- 오른쪽 Preview Mode를 활성화 하는 버튼과 디자인한 에디터를 서버에 저장하는 save 버튼

#### Canvas
![image](https://github.com/user-attachments/assets/ece90f7b-5331-4dcb-9990-88f0f1fde66e)
- 오른쪽 aside에서 컴포넌트를 드래그 앤 드랍을 이용하여 왼쪽 캔버스로 이동시켜 컴포넌트를 추가

![image](https://github.com/user-attachments/assets/2692b6ea-6e6e-49e3-bdcb-4db4996a143d)
- style tab에서 선택한 컴포넌트를 height: 500px, margin: 10px 스타일링

기술 스택

- React, Next (app router), typescript, zustand
- Tailwindcss, Next UI, shadcn UI
- Supabase, Zod
- jose(JWT), bcrypt
