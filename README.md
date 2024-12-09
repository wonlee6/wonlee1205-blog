# Read me

# 포트폴리오 - 웹 개발자

## 🚀 프로젝트 개요

현재 운영 중인 3개의 주요 프로젝트를 소개합니다.

### 📎 [포트폴리오 웹사이트](https://wonlee1205-blog.vercel.app/)

## 1. 기술 블로그

프론트엔드 개발 지식을 체계적으로 정리하고 공유하는 플랫폼

- **사용 기술**: React, Next.js (App Router), TypeScript

## 2. 차트 시각화 도구

### 주요 기능

- ECharts 기반의 다양한 차트 시각화
- Monaco Editor를 활용한 실시간 차트 코드 편집
- Prettier를 통한 코드 포매팅

### 기술 스택

- **프레임워크**: React, Next.js (App Router)
- **언어**: TypeScript
- **UI/스타일링**: TailwindCSS, Next UI
- **핵심 라이브러리**: ECharts, Monaco Editor, Prettier

## 3. 웹 빌더 (No-Code Platform)

### 핵심 기능

1. **사용자 인증 시스템**

   - JWT(jose) 기반 보안 인증
   - bcrypt를 통한 비밀번호 암호화
   - Supabase 데이터 저장소 연동
   - Zod 기반 유효성 검증

2. **드래그 앤 드롭 에디터**

   - 반응형 디자인 지원 (Desktop, Tablet, Mobile)
   - 실시간 미리보기
   - 컴포넌트 기반 페이지 구축
   - 이미지 에셋 관리 시스템

3. **프로젝트 관리 기능**
   - 랜딩 페이지 관리
   - 암호화된 API 통신

### 기술 스택

- **프레임워크**: React, Next.js (App Router)
- **상태 관리**: Zustand
- **언어**: TypeScript
- **UI/스타일링**: TailwindCSS, Next UI, shadcn UI
- **백엔드/인프라**: Supabase
- **보안**: jose(JWT), bcrypt
- **유효성 검증**: Zod

## 💪 핵심 역량

1. **모던 프론트엔드 개발**

   - React와 Next.js 기반의 견고한 애플리케이션 구축
   - TypeScript를 활용한 타입 안정성 확보

2. **사용자 경험 중심 설계**

   - 직관적인 드래그 앤 드롭 인터페이스 구현
   - 반응형 디자인 적용

3. **보안 및 성능 최적화**
   - JWT 기반 인증 시스템 구축
   - 암호화 통신 구현

## 📝 프로젝트 상세 설명

### 1. 기술 블로그

프론트엔드 개발 관련 학습 내용을 체계적으로 정리하고 공유하는 플랫폼입니다.

### 2. 차트 시각화 도구

#### 주요 기능 상세

1. **차트 카테고리 분류 시스템**

   - 차트 종류별 구분된 리스트 제공
   - 직관적인 차트 선택 인터페이스

2. **실시간 차트 편집 기능**
   - Monaco Editor를 통한 코드 실시간 수정
   - 즉각적인 차트 렌더링 반영
   - Prettier를 활용한 자동 코드 포매팅

#### 구현 화면

![차트 리스트](https://i.postimg.cc/3x47w53M/2024-09-01-2-27-19.png)

- 차트 종류별 카테고리 뷰

![차트 에디터](https://i.postimg.cc/nLqJv4s0/2024-09-01-2-28-29.png)

- Monaco Editor를 통한 차트 코드 편집 기능

![코드 포매팅](https://i.postimg.cc/k4hfGZnZ/2024-09-01-2-28-41.png)

- Prettier를 활용한 코드 자동 정렬

### 3. 웹 빌더 (No-Code Platform)

#### 구현 기능 상세

1. **인증 시스템**

   - JWT 토큰 기반 보안 인증 구현
   - 비밀번호 암호화 처리
   - Supabase 연동 데이터 관리
   - Zod를 활용한 폼 유효성 검증

2. **프로젝트 관리 시스템**

   - 랜딩 페이지 CRUD 기능
   - 암호화된 API 통신 구현
   - 프로젝트 목록 관리

3. **드래그 앤 드롭 에디터**

   #### 주요 기능

   - **반응형 디자인 지원**
     - Desktop, Tablet, Mobile 뷰 전환
     - 디바이스별 최적화된 레이아웃
   - **컴포넌트 관리**
     - 드래그 앤 드롭 방식의 컴포넌트 배치
     - 컴포넌트별 커스텀 설정 기능
     - 트리 구조의 레이어 관리
   - **에셋 관리**
     - Supabase 스토리지 연동
     - 이미지 업로드 및 관리 기능

   #### 주요 화면

   - **툴박스**
     - 프로젝트 정보 표시
     - 반응형 디바이스 전환 버튼
     - 프리뷰 모드 및 저장 기능
   - **캔버스**
     - 실시간 컴포넌트 배치 및 수정
     - 직관적인 드래그 앤 드롭 인터페이스
   - **사이드 패널**
     - Styles: 스타일 속성 관리
     - Components: HTML 컴포넌트 목록
     - Layers: 트리 구조 레이어 관리
     - Storage: 이미지 에셋 관리

#### 기술적 도전 및 해결

1. **상태 관리 최적화**

   - Zustand를 활용한 효율적인 상태 관리
   - 컴포넌트 간 데이터 흐름 최적화

2. **보안 강화**

   - JWT 토큰 기반 인증
   - API 통신 암호화
   - 안전한 데이터 저장소 구현

3. **사용자 경험 개선**
   - 직관적인 UI/UX 설계
   - 실시간 미리보기 기능
   - 반응형 디자인 지원

#### 화면 Flow

> Sign-In, Sign-Up

![image](https://github.com/user-attachments/assets/1748197b-a606-46f2-ab61-41595da5dae5)

#### Project

![image](https://github.com/user-attachments/assets/4cad81df-87fd-49b8-a972-e937ce7b603b)

#### Editor

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

#### LiveMode: ToolBox 맨 오른쪽 플레이 아이콘을 누르게 되면 활성화

![image](https://github.com/user-attachments/assets/9c630c58-d56f-4f2f-9f11-042d9a42b82f)
