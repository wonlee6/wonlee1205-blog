---
title: 'Basic Next'
date: '2023-04-16'
tag: 'Next'
description: 'Next의 특징인 SSR, SSG, ISR 및 API 통신 방법'
---

## Data Fetching

- SSR: 서버에 요청할 때마다 데이터를 받아와 보여준다

```jsx
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      time: new Date().toISOString()
    }
  }
}
```

- SSG: Build Time에 데이터를 받아와 보여준다. (npm dev === SSR처럼 동작)

```jsx
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      time: new Date().toISOString()
    }
  }
}
```

- ISR: 특정 주기마다 데이터를 받아와 보여준다.

```jsx
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      time: new Date().toISOString()
    },
    revalidate: 1 // 1초
  }
}
```

## Layout/Pages/Image

Next는 모든 페이지를 기본적으로 Pre-Render(HTML 보여줌) 한다.

SSG는 빌드 타임에 Pre-Render  
SSR은 요청 타임에 Pre-Render

### Layout 공통화

공통 컴포넌트를 만든 후

```jsx
function MyApp({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

## 여러 개의 레이아웃을 사용할 경우

\_app에서 `Type 선언`

```jsx
// _app.tsx
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
// ssr.tsx
const SSR: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <div>
      <h1>SSR: {props.time}</h1>
    </div>
  )
}
SSR.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  )
}
```

## Images

Next에서 Image에 대한 여러가지 기능을 지원한다.

```jsx
<Image src={cat} alt='cat' layout='responsive' width={'400'} height='400' />
```

정리

- Pre-Render: SEO, 초기 로딩 속도
- Layout: pages/\_app.js 활용해서 페이지 공통화
- Images: 최적화된 이미지 활용 util

## Dynamic Routes

파일을 만들 때 `[slug].tsx` 형식으로 만든다

route 값을 꺼내 올 때

```jsx
const route = useRouter()
const {slug} = route.query
```

http://localhost:3000/category/food?from=res

```jsx
const route = useRouter()
const {slug, from} = route.query
```

어떤 값이든 가져올 수 있다.

`[[slug]].tsx` 이렇게 하면 옵셔널하게 사용 가능

`route.push`를 이용하여 원하는 URL로 이동 가능

- ex) route.push('/category/food?date=2022/12/22')

### URL를 바꾸는 방법

1. location.replace("url"): 로컬 state 유지 안됨(리렌더)
2. route.push(url): 로컬 state 유지, data fetching
3. rotue.push(url, as, { shallow: true}): 로컬 state 유지, data fetching X

```tsx
location.replace('/myInfo/setting?status=editing') // 초기로 돌아감
router.push('/myInfo/setting?status=editing') // data fetching 일어남
router.push('/myInfo/setting?status=editing', undefined, {
  shallow: true
}) // data fetching 일어나지 않음
```

## API 통신

api 폴더 안에 있는 경로가 data fetch url

```tsx
// /api/hello.ts
type Data = {
	name: string
}
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	res.status(200).json({ name: 'John Doe' })
}
// pages/[username]/[info].tsx
const router = useRouter()
	const { username, info} = router.query
	const [name, setName] = useState('?')
	useEffect(() => {
		if (!uid) return
		fetch(`/api/hello`)
			.then((res) => res.json())
			.then((data) => setName(data.name))
	}, [uid])
...
```

위와 같이 통신 가능

### 다이나믹 통신 방법

```tsx
// /api/user-info/[uid].ts
type Data = {
  name: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {uid} = req.query
  const cokies = req.cookies
  res.status(200).json({name: `John Doe ${uid}`})
}
// pages/[username]/[info].tsx
const router = useRouter()
const {username, info, uid} = router.query
const [name, setName] = useState('?')
useEffect(() => {
  if (!uid) return
  fetch(`/api/user-info/${uid}`)
    .then((res) => res.json())
    .then((data) => setName(data.name))
}, [uid])
```

`router.quert`는 처음 값을 가져올 때 `undefined`

### 쿠키 및 에러, reDirect

```ts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {uid} = req.query
  const cokies = req.cookies
  // res
  // 	.status(200)
  // 	.json({ name: `John Doe ${uid}, cokies: ${JSON.stringify(cokies)}` })
  // res.status(404).send({ error: 'error' })
  res.redirect(307, '/api/hello')
}
```
