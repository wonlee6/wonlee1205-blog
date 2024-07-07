---
title: 'Prettier 사용하여 코드 정렬(vsCode expansion 아님)'
date: '2024-07-01'
tag: 'Etc'
description: 'Prettier 사용하여 코드 정렬 하는 방법(vsCode expansion 아님)'
---

아마 대부분 vsCode 확장프로그램인 prettier 통해 코드 정렬하는 방법은 잘 알지만

런타임 에디터 내에서 코드 정렬하는 방법에 대해서는 공유를 해볼려 한다.

### `Monaco Editor` 사용하면서 에디터 안의 코드를 Prettier 이용하여 코드 정렬 하는 방법

1. 설치

```
npm i -D prettier
```

2. import

```jsx
// in something component
import prettier from 'prettier/standalone'
import tsPrinter from 'prettier/parser-typescript'
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

#### before

![before](https://i.ibb.co/fdS1kcK/before.png)

#### after

![after](https://i.ibb.co/4KMxyqQ/after.png)

typescipt 말고도 다른 parser 옵션이 많으니 참고하면 된다.