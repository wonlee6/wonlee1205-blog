---
title: 'Change Event'
date: '2021-11-14'
tag: 'React'
description: 'React의 Change Event에 대한 정리'
---

### 보통 onchage 함수를 통해 이벤트를 다루기도 하지만, HtmlElement에서 직접적으로 접근 가능하다.

```tsx
const [form, setForm] = usestate({
  id : "",
  name : "",
})
return (
  <React.Fragment>
   <input
     type='text'
     id='name'
     value={form.name}
     onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })
     }
    />
  <React.Fragment />
)
```

위의 코드 처럼 가능

onChange에 어떤 element다룰지 명시해야 한다.

## checkbox or radio

### radio

useCallBack으로 최적화 한다면?

```tsx
// radio
const [form, setForm] = useState({
  gender: 'N' // default None
})
const onChangeGender = useCallBack((gender: string) => {
  setForm((form) => {
    return {
      ...form,
      gender
    }
  })
}, [])
return (
  <ul>
    <li>
      <input
        type='radio'
        id='M'
        checked={form.gender === 'M'}
        onChange={() => onChangeGender('M')}
        name='gender'
      />
      <label htmlFor='M'></label>
      <label htmlFor='M'>남성</label>
    </li>
    <li>
      <input
        type='radio'
        id='F'
        checked={form.gender === 'F'}
        onChange={() => onChangeGender('F')}
        name='gender'
      />
      <label htmlFor='M'></label>
      <label htmlFor='M'>여성</label>
    </li>
    <li>
      <input
        type='radio'
        id='N'
        checked={form.gender === 'N'}
        onChange={() => onChangeGender('N')}
        name='gender'
      />
      <label htmlFor='M'></label>
      <label htmlFor='M'>무관</label>
    </li>
  </ul>
)
```

### checkbox

```tsx
// checkBox
const [checked, setChecked] = useState<Array<number>>([])
const onChangeCheck = (e: number) => {
  setChecked(
    checked.includes(e) ? checked.filter((i) => i !== e) : checked.concat(e)
  )
}
return (
  <>
    <input
      type='checkbox'
      name='name'
      id='checked-1'
      checked={checked.includes(1)}
      onChange={() => onChangeCheck(1)}
    />
    <input
      type='checkbox'
      name='name'
      id='checked-2'
      checked={checked.includes(2)}
      onChange={() => onChangeCheck(2)}
    />
  </>
)
```

number배열로 관리해도 되고 string으로 관리해도 된다.

### List의 체크 관리 할때

```tsx
const [checkedList, setCheckedList] = useState([] as any)
// checkbox function
const onCheckedAll = useCallback(
  (checked) => {
    if (checked) {
      const checkedListArray = [] as any
      userData.forEach((list) => checkedListArray.push(list))
      setCheckedList(checkedListArray)
    } else {
      setCheckedList([] as any)
    }
  },
  [userData]
)
const onCheckedElement = useCallback(
  (checked, list) => {
    if (checked) {
      setCheckedList([...checkedList, list])
    } else {
      setCheckedList(checkedList.filter((i: any) => i !== list))
    }
  },
  [checkedList]
)
return (
  // checkbox all
  <input
    type='checkbox'
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      onCheckedAll(e.target.checked)
    }
    checked={
      checkedList.length === 0
        ? false
        : checkedList.length === userData.length
        ? true
        : false
    }
  />
  ...
  // checkbox
   <input
     type='checkbox'
     onChange={(e: ChangeEvent<HTMLInputElement>) =>
       onCheckedElement(e.target.checked, item)
     }
     checked={checkedList.includes(item) ? true : false}
   />
)
```

## sort

제목을 클릭했을 때 정렬 기능

```tsx
// id,title 만 적용
const [sort, setSort] = useState({
  id: 0,
  title: 0,
})
const onSort = (e: 'id' | 'title') => {
  setSort({
    ...sort,
    [e]: sort[e] === 0 ? 1 : sort[e] * -1,
  })
}
const sorted_table_data = useMemo(() => {
  // userData에서 10개 씩만 보여 준다는 가정
  const return_data = userData.filter((_, index) => index < 10)

  if (Object.values(sort).filter((v) => v !== 0)) {
    const target = sort.id ? 'id' : 'title'
    const reverse = sort[target]
    return_data.sort((a, b) =>
      a[target] > b[target]
        ? 1 * reverse
        : a[target] < b[target]
        ? -1 * reverse
        : 0
    )
  }
  return return_data
}, [sort, userData])
return (
  ...
   <th onClick={() => onSort('id')>id</th>
   <th onClick={() => onSort('title')>title</th>
  ...
)
```

## file

### File upload

file, 파일을 선택 후 미리보기 까지 진행

```tsx
const [form, setForm] = useState({
  name: '',
  gender: 'N',
  file: null as File | null, // File 담을 그릇
  img_url: '', // 미리보기 할 그릇
})
const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.length) {
    const file = e.target.files[0] // 하나만 선택되도록 하기에 0번째 정보를 가져옴
    const reader = new FileReader() // FileReader 함수 이용
    reader.onload = (e) => {
      if (e.target) {
        if (typeof e.target.result === 'string') {
          setForm({
            ...form,
            file,
            img_url: e.target.result,
          })
        }
      }
    }
    reader.readAsDataURL(file)
  }
}
return (
   <input
     type='file'
     id='file'
     className='upload-hidden imageUpload'
     accept='.png'
     onChange={fileChange}
   />
   <img
     className={styles.img}
     src={form.img_url}
     alt='img'
     onError={() => setForm({ ...form, img_url: '' })}
    />
)
```

img src 에 base64정보를 입력  
만약, fileChange를 모듈화작업을 한다면

```tsx
export const fileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (file: File, url: string) => void
) => {
  if (e.target.files?.length) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        if (typeof e.target.result === 'string') {
          callback(file, e.target.result)
        }
      }
    }
    reader.readAsDataURL(file)
  }
}
// component
const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  fileChange(e, (file, base64) => {
    setForm({
      ...form,
      file,
      file_name: file.name,
      logo_url: base64
    })
  })
}
```

이해가 안된다면 콘솔 로그를 통해 확인해보자
