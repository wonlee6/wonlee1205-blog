---
title: 'Pagination'
date: '2021-10-26'
tag: 'React'
description: 'Pagination 처리는 어떻게 하면 좋을까?'
---

전체 데이터만 가지고 온다면

```jsx
const postsperPage = useRef(10) // 10개씩 보여줄 수
const [currentPage, setCurrentPage] = useState < number > 1 // 보고있는 현재 페이지
const indexOfLast: number = currentPage * postsperPage.current
const indexOfFirst: number = indexOfLast - postsperPage.current
const currentPosts = (tmp: any) => {
  let currentPosts = 0
  currentPosts = tmp.slice(indexOfFirst, indexOfLast)
  return currentPosts
}
// slice 는 어디부터 어디까지 잘라낸후 새로운 배열을 반환
```

```tsx
  // paper component
    ...
  <div>
 <Pagination per_page={postsperPage.current}
             total_page={paperData.length} // 가져온 데이터들의 총 길이 (개수)
             onChangePage={setCurrentPage}
             current_page={currentPage} />
 </div>
...
```

Pagination 컴포넌트

```tsx
const Pagination = (props) => {
  const {per_page, total_page, onChangePage, current_page} = props
  const max_pages = Math.ceil(total_page / per_page)
  const rendering_page_number = Array(10) // 10개의 요소를 가진 배열을 만듬
    .fill(null) // 10개의 배열 값은 null
    .map((_, index) => {
      // index만 필요하기에 (_, index)
      const additional = Math.floor((current_page - 1) / 10) * 10 // 결과 : [0,1,2,3,4,5,6,7,8,9]
      const current = index + 1 + additional // 결과 : [1,2,3,4,5,6,7,8,9,10]
      return current > max_pages ? null : current // 현재 페이지가 31, 마지막페이지가 33 경우, [31,32,33,null,null,null,null,null,null,null]
    })
    .filter((i) => i !== null) // null 값을 지움
  const onClickPrev = () => {
    current_page <= 10 ? onChangePage(1) : onChangePage(current_page - 10)
  }
  const onClickNext = () => {
    rendering_page_number.length >= 10
      ? onChangePage(current_page + 10)
      : onChangePage(max_pages)
  }
  return (
    <>
      <div className='pagination'>
        <ul className='clearfix'>
          {current_page !== 1 && (
            <>
              <li>
                <Link to='#' onClick={onClickPrev}>
                  <img src={backArrow} alt='전 페이지로' />
                  <img src={backArrow} alt='전 페이지로' />
                </Link>
              </li>
              <li>
                <Link to='#' onClick={() => onChangePage(current_page - 1)}>
                  <img src={backArrow} alt='전 페이지로' />
                </Link>
              </li>
            </>
          )}
          {rendering_page_number.map((value, index) => (
            <li
              key={index}
              value={value}
              onClick={() => onChangePage(value)}
              className={value === current_page ? 'active' : ''}>
              <Link to='#'>{value}</Link>
            </li>
          ))}
          {current_page !== max_pages && (
            <>
              <li>
                <Link to='#' onClick={() => onChangePage(current_page + 1)}>
                  <img src={frontArrow} alt='다음 페이지로' />
                </Link>
              </li>
              <li>
                <Link to='#' onClick={onClickNext}>
                  <img src={frontArrow} alt='다음 페이지로' />
                  <img src={frontArrow} alt='다음 페이지로' />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
```

```tsx
        // paper component
const getPaperData = async () => {
    await API.paper
      .getPaper(searchPaper)
      .then((res) => {
        const data = res.data.data.result
        setPaperData(data)
        setCurrentPage(1) // 처음 보여줄 페이지
      })
      .catch(async (err) => {
        await errorHandler(err, getPaperData)
      })
}
        return
                        ...
                      <tbody>
                    <PaperList post={currentPosts(paperData)} />
                  </tbody>
                </table>
              </div>
             <Pagination per_page={postsperPage.current}
                        total_page={paperData.length} // 가져온 데이터들의 총 길이 (개수)
                        onChangePage={setCurrentPage}
                        current_page={currentPage} />
          </div>
         ...
```

### API 에서 per_page, size, total_count를 준다면

위의 코드 수정

```tsx
 // pagination state
  const [post_per_pag, setPostPerPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total_count, setTotalCount] = useState<number>(1)
  // API
  API.student.getClass({
    // 넘길 값
    page : currentPage
  }).then((res) => {
      if (res.stuts === 200) {
        setPostPerPage(res.data.size)
        setTotalCount(res.data.total_count)
       }
     })
  //
       ...
                      <tbody>
                    <PaperList post={paperData} />
                  </tbody>
                </table>
              </div>
             <Pagination per_page={post_per_pag}
                        total_page={total_count}
                        onChangePage={setCurrentPage}
                        current_page={currentPage} />
          </div>
         ...
```

API 에 page 값을 params에 넘긴다

```ts
  getClass(request? : studentDataModel) {
    //
    params : request
  }
```

마지막으로

```tsx
useEffect(() => {
  //API 불러오는 함수
}, [currentPage])
```

끝
