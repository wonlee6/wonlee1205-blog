---
title: 'Prettier 사용하여 코드 정렬(vsCode extansion 아님)'
date: '2024-07-01'
tag: ['prettier', 'etc']
description: 'Prettier 사용하여 코드 정렬 하는 방법(vsCode extansion 아님)'
---

아마 대부분 vsCode 확장프로그램인 prettier 통해 코드 정렬하는 방법은 잘 알지만

런타임 에디터 내에서 코드 정렬하는 방법에 대해서는 공유를 해볼려 한다.

### `Monaco Editor` 사용하면서 에디터 안의 코드를 Prettier 이용하여 코드 정렬 하는 방법

> nextjs 14.2.5 환경에서 테스트

1. 설치

```shell
npm i -D prettier
```

2. import

```jsx
// in something component
import * as prettier from 'prettier/standalone'
import * as tsPrinter from 'prettier/parser-typescript'
import * as prettierPluginEstree from 'prettier/plugins/estree'
```

위 3개를 import

3. 적용

```js
chartOption.current = await prettier.format(`option = ${JSON.stringify(getChartOption)}`, {
  parser: 'typescript',
  tabWidth: 2,
  plugins: [tsPrinter, prettierPluginEstree]
})
```

### before

![before](https://i.ibb.co/fdS1kcK/before.png)

### after

[![2024-07-20-8-15-36.png](https://i.postimg.cc/15wpN40q/2024-07-20-8-15-36.png)](https://postimg.cc/cr1Kpxbx)

typescipt 말고도 다른 parser 옵션이 많으니 참고하면 된다.
