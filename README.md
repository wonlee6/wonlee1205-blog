# Read me

> Blog, Chart, Web Builder

### [HomePage](https://wonlee1205-blog.vercel.app/)

## Blog

### Front-end 관련 학습한 내용을 정리

## Chart

> ECharts, Monaco Editor를 이용해서 Chart 구현 (Chart Type 지원)

[![2024-09-01-2-27-19.png](https://i.postimg.cc/3x47w53M/2024-09-01-2-27-19.png)](https://postimg.cc/QF3v6zBS)

차트 종류에 따라 차트 리스트를 보여주는 화면

[![2024-09-01-2-28-29.png](https://i.postimg.cc/nLqJv4s0/2024-09-01-2-28-29.png)](https://postimg.cc/HJWRm79y)

선택한 차트에 대한 정보를 보여주며, `Monaco Editor`를 통한 결과 값으로 차트 구현

[![2024-09-01-2-28-41.png](https://i.postimg.cc/k4hfGZnZ/2024-09-01-2-28-41.png)](https://postimg.cc/XGdwDsBc)

디테일 한 차트 옵션을 `Prettier` 통해 정보 제공

- 기술 스택
  - React, Next (app router), typescript
  - TailWindCss, Next UI
  - ECharts, Monaco Editor
  - Prettier

## Web Builder

> 순서 Auth > Project > Canvas

[![2024-09-01-2-34-23.png](https://i.postimg.cc/tgqKVKjC/2024-09-01-2-34-23.png)](https://postimg.cc/21tcsXyP)

#### 회원 가입 및 로그인 화면

Session 및 데이터를 `Jose`, `bcrypt` 통해 암호화 처리하였습니다.

[![2024-09-01-2-46-54.png](https://i.postimg.cc/prfCCdQN/2024-09-01-2-46-54.png)](https://postimg.cc/RJ0wV4bG)

#### Project 관리하는 화면

[![2024-09-01-2-50-02.png](https://i.postimg.cc/VN2FctDQ/2024-09-01-2-50-02.png)](https://postimg.cc/B8cFTXrM)

톱니바퀴를 누르게 되면 선택한 Project를 관리하는 모달 노출

> 처음 설계당시 Landing Page를 관리하는 화면으로 생각하였습니다. 현재 간단한 CRUD만 가능하며, 추후 수정 예정입니다.

`Go to Page` 버튼을 누르게 되면 화면을 수정할 수 있는 페이지로 이동합니다.

[![2024-09-01-3-05-42.png](https://i.postimg.cc/pLHT3LDG/2024-09-01-3-05-42.png)](https://postimg.cc/0bVPwxXD)

Drag and Drop을 통해 Element를 추가

[![2024-09-01-3-07-33.png](https://i.postimg.cc/TP2PYNNn/2024-09-01-3-07-33.png)](https://postimg.cc/fVFs8CNb)

추가한 Element를 Style Tab에서 스타일 적용

[![2024-09-01-3-10-53.png](https://i.postimg.cc/dtMtTVSs/2024-09-01-3-10-53.png)](https://postimg.cc/WtnPBTvC)

Supabase에 image 등록 후 Background image 삽입

[![2024-09-01-3-01-51.png](https://i.postimg.cc/xjp1jPLz/2024-09-01-3-01-51.png)](https://postimg.cc/146QJwCm)

전체 Element들을 Layers Tab에서 Tree로 보여줌

기술 스택

- React, Next (app router), typescript, Zustand
- Tailwindcss, Next UI, shadcn UI
- Supabase, Zod

> 전체적인 기능 구현이 100% 되지 않았습니다. 양해 부탁드립니다.
