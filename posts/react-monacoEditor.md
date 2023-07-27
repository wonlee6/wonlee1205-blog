---
title: 'Monaco Editor'
date: '2023-04-26'
tag: 'React'
description: 'Code Editor - Monaco Editor 사용법과 Prettier를 통해 코드 정렬까지 해보는 시간'
---

## 1. 설치

이전 포스트 중 ECharts 관련 포스팅을 한 적이 있는데, 해당 차트의 데이터를 코드 에디터로 가져와 보여주도록 해보자

먼저 설치

```
yarn add @monaco-editor/react
```

React 환경에서 사용하기 위해 위 라이브러리 설치

## 2. 적용

```jsx
import Editor from '@monaco-editor/react'

export default function ChartCode(props: Props) {
  const [text, setText] = useState('')

  const handleChange = (value) => {
    setText(value)
  }

  return (
    <Editor
      height={'100%'}
      language='javascript'
      options={{
        minimap: {
          enabled: false
        },
        fontSize: 14,
        scrollbar: {
          horizontal: 'auto',
          vertical: 'auto'
        },
        readOnly: false,
        formatOnPaste: true,
        formatOnType: true,
        lineNumbers: 'off',
        automaticLayout: true
      }}
      value={text}
      onChange={handleChange}
    />
  )
}
```

심플하게 예제를 만들었다.

옵션들을 확인해보면

- minimap: vsCode 오른쪽 상단 미니맵처럼 생긴 것을 on, off
- scrollbar: 가로 세로 스크롤
- readOnly: 수정 가능/불가능
- lineNumbers: 코드 에디터의 라인 넘버를 보여줄지 안보여줄지
- formatOnPaste: 아마 붙여넣기 기능인걸로,,, 기억한다.

## 3. Prettier

만약 데이터들이 상태가 더럽다면? 코드들을 이쁘게 화장시켜서 보여주고 싶다면?

```
yarn add prettier/standalone prettier/parser-typescript
```

타입스크립트 환경이라면 `prettier/parser-typescript` 설치해야한다.

안그러면 못 찾는다고 징징댈것이다.

```jsx
import prettier from 'prettier/standalone'
import parserTypeScript from 'prettier/parser-typescript'

const handleMount = () => {
  const txt = prettier.format(`option = ${JSON.stringify(props.data)}`, {
    parser: 'typescript',
    plugins: [parserTypeScript],
    bracketSpacing: true,
    trailingComma: 'none'
  })
  setText(txt)
}
```

props로 받은 차트 데이터를 JSON.stringify를 통해 변환한 후 나머지는 Prettier에 맡기자

```jsx
...
<Editor
    height={"100%"}
    language="javascript"
    options={{
        minimap: {
            enabled: false
        },
        fontSize: 14,
        scrollbar: {
            horizontal: "auto",
            vertical: "auto"
        },
        readOnly: true,
        formatOnPaste: true,
        formatOnType: true,
        lineNumbers: "off",
        automaticLayout: true
    }}
    value={text}
    onMount={handleMount}
/>
...
```

onMount에 위 함수를 등록하면 끝.

내가 원하는 결과물은 사용자에게 코드를 보여주기 위한 목적이기에 수정은 불가하게 변경했다.

[monaco-editor](https://microsoft.github.io/monaco-editor/)

> monaco-editor/react에 대한 정보는 아래에서 확인

[monaco-editor/react](https://github.com/suren-atoyan/monaco-react#readme)
