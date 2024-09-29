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

### Auth

> Sign-In, Sign-Up

![image](https://github.com/user-attachments/assets/1748197b-a606-46f2-ab61-41595da5dae5)

- `jose`, `bcrypt` 라이브러리를 이용해서 암호화 관리
- ID 및 암호화된 Password를 Supabase에 저장
- Session 저장
- `Zod` 유효성 검사

### Project

![image](https://github.com/user-attachments/assets/4cad81df-87fd-49b8-a972-e937ce7b603b)

- Landing page를 관리하는 페이지
- API 데이터는 암호화 통신
- `Zod` 유효성 검사

### Editor

![image](https://github.com/user-attachments/assets/c91c4cb5-8b3a-4281-917c-fc7641a8303e)
앞서 `Go to Page` 버튼을 통해 들어오게 되면 처음 마주하는 화면

> Toolbox

![image](https://github.com/user-attachments/assets/9a2570d2-5710-4c49-b3cb-9f4fb7483876)

- 왼쪽부터 선택한 프로젝트 이름, 설명(아이콘)
- 가운데: Desktop, tablet, mobile 사이즈로 변경하는 버튼
- 오른쪽 Preview Mode를 활성화 하는 버튼과 디자인한 에디터를 서버에 저장하는 save 버튼

> Canvas

![image](https://github.com/user-attachments/assets/ece90f7b-5331-4dcb-9990-88f0f1fde66e)

- 오른쪽 aside에서 컴포넌트를 드래그 앤 드랍을 이용하여 왼쪽 캔버스로 이동시켜 컴포넌트를 추가

![image](https://github.com/user-attachments/assets/c2552dd0-2297-4c66-94db-13f75aba0f2c)

- `Heading`, `Image` 컴포넌트 추가
- 각각의 컴포넌트는 파란색 버튼을 눌러 고유한 옵션들을 설정 할 수 있다.(Structure 컴포넌트 제외)

![image](https://github.com/user-attachments/assets/a3dce6c7-77e2-47bf-904c-b2b598ad1fde)

- 이미지는 Storage Tab에서 업로드할 수 있으며, Supabase에 저장
- Storage에 저장된 이미지들 중 하나를 선택해서 적용한 모습

![image](https://github.com/user-attachments/assets/d5cfd2a0-97f6-4795-b249-30e8a19e21f9)

- 컴포넌트들을 조합해서 디자인 한 모습

> Tabs

- Styles Tab: 자주 사용되는 스타일 속성들을 스타일링 할 수 있는 탭  
  ![image](https://github.com/user-attachments/assets/1f6ed263-73ce-4471-8068-3c7de9b2782d)
- Component Tab: 웹 페이지를 구성할 때 자주 사용되는 Html Tag들로 구성  
  ![image](https://github.com/user-attachments/assets/9b2680dd-eb9d-4136-8b00-be4131a6337c)
- Layer Tab: Canvas에 디자인한 컴포넌트들을 Tree형식으로 구현  
  ![image](https://github.com/user-attachments/assets/a69fd36c-44c4-4d29-9ac5-b1328bc0d4e5)
- Storage Tab: 이미지들을 저장하고 관리  
  ![image](https://github.com/user-attachments/assets/696585d5-b6d6-4692-91ef-49c55294a16c)

### LiveMode: ToolBox 맨 오른쪽 플레이 아이콘을 누르게 되면 활성화

![image](https://github.com/user-attachments/assets/9c630c58-d56f-4f2f-9f11-042d9a42b82f)

기술 스택

- React, Next (app router), typescript, zustand
- Tailwindcss, Next UI, shadcn UI
- Supabase, Zod
- jose(JWT), bcrypt
