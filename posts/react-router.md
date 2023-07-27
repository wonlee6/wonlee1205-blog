---
title: 'React - Router'
date: '2021-11-26'
tag: 'React'
description: 'React 라이브러리인 React-router에 대한 기본적인 기능'
---

## query

> react-router v6부터 변경되는 점이 있어 최신 버전에는 적용안될수 있음

### 리스트에서 detail 페이지를 불러올 떄

경로 관리 페이지

```js
const PaperDetail = lazy(() => import('./page/setting/paper-detail'))
<Route path='/paper/detail/:idx' exact component={PaperDetail}/>
```

:idx에 따라 URL에 보여준다

```tsx
// list component
<td>
  <Link to={`/paper/detail/${value.idx}`}>{value.name}</Link>
</td>
```

url: .../detail/1 로 나타나기에 idx 를 가지고 와야한다.  
가지고 오는 방법은,

```tsx
// 컴포넌트에서 props: RouteComponentProps 받아온다면
const {history, location, match} = props
// react-router 의 useRouteMatch 이용
const router = useRouteMatch()
 const getDetail = async () => {
    const params = router.params as { idx: string } // typescript의 타입 얼라이언스 이용하여 타입 선언
    await API.paper
      .getPaperDetail(+params.idx)
      .then((res) => {
        const data = res.data.data.detail
        setPaperData(data)
      })
      .catch(async (err) => {
        await errorHandler(err, getDetail)
      })
useEffect(() => {
  getDetail()
}, [])
```

api

```ts
  putPaperFix(request: number, data: PostCreatePaperRequestDataModel) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/admin/setting/paper/${request}`,
      method: 'PUT',
      data: data,
    }
    return axios(config)
  },
}
```

다른 예는

```tsx
api : sucesss 시
  history.push('/경로', state)
```

state에 정보를 담아서 보낼 수 있다.  
`console.log(location)` 확인해 보면 state안에 정보가 담아있는 것을 확인 가능

## React-router v6 이후 변경점

```tsx
<Router>
  <Suspense fallback={<div>Loading</div>}>
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/api' exact component={Api} />
      <Route path='/change_event' exact component={ChangeEvent} />
    </Switch>
  </Suspense>
</Router>
```

switch 안에 route를 이용하여 만들었다면, v6부터는

```tsx
<BrowserRouter>
  <Suspense fallback={<div>Loading</div>}>
    <Routes>
      <Route path='/' exact element={<Main />} />
      <Route path='/api' element={<Api />} />
      <Route path='/change_event' element={<ChangeEvent />} />
    </Routes>
  </Suspense>
</BrowserRouter>
```

위와 같은 코드로 변경되었다

### 또 다른 변경사항

```tsx
const history = useHistory() // v5
const navigator = useNavigate() // v6
history.push('/') // v5
navigator('/') // v6
```

history가 useNavigate 로 변경 되었다.
