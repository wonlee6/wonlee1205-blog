---
title: 'EventLoop'
date: '2021-06-13'
tag: 'Javascript'
description: 'javascript 핵심인 EventLoop에 대한 정리 글'
---

자바스크립트는 싱글 스레드로, 한 번에 한 가지 일만 할 수 있습니다. 이것은 일반적으로 큰 문제 없지만, 30초가 걸리는 일을 수행한다고 상상해보세요.. 우리는 그 일을 처리하는 30초 동안 아무것도 할 수 없습니다. (자바스크립트는 기본적으로 브라우저의 메인 스레드로 동작하기에, UI가 멈추게 됩니다.)

다행히, 브라우저는 자바스크립트 엔진 자체가 제공하지 않는 웹 API 기능을 제공합니다. 이 API는 DOM API, setTimeout, HTTP requests 등이 포함됩니다. 이것은 우리가 비동기, non-block 동작을 만드는 데 도움을 줍니다.

우리가 함수를 실행하면, 그 함수는 call stack(이하 콜 스택) 에 추가됩니다. 콜 스택은 자바스크립트 엔진의 한 부분이며, 브라우저에만 한정된 것은 아닙니다. 이것은 선입후출(first in, last out)의 스택입니다. 함수가 값을 반환하면 그 함수는 스택에서 빠져나와 사라집니다.

![event](https://res.cloudinary.com/practicaldev/image/fetch/s--44yasyNX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif)

respond 함수는 setTimeout함수를 반환합니다. setTimeout함수는 Web API에서 제공되는 함수로, 메인 스레드를 막지 않고 작업을 지연시킬 수 있습니다. setTimeout에 전달한 콜백 함수인 화살표 함수 ()=>{return 'Hey'}가 Web API에 추가됩니다. 그동안 setTimeout 함수와 respond 함수는 그들의 값을 반환했으니, 스택에서 빠져나옵니다.

![event](https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif)

Web API 안에서, 타이머는 setTimeout에 전달한 두 번째 인자 1000ms 동안 실행됩니다. 콜백은 즉시 호출 스택에 추가되지 않고, 대신 '큐(대기열)'에 전달됩니다.

![event](https://res.cloudinary.com/practicaldev/image/fetch/s--MewGMdte--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

이것은 조금 혼란스러울 수 있습니다. 1000ms 후에 콜 스택에 추가되어 값을 반환한다는 의미가 아닙니다. 1000ms 후에 단순히 큐에 추가됩니다. 그러나 큐는 대기열이므로, 해당 함수는 자기 차례를 기다려야 합니다!

이제 우리가 기다리던, 이벤트 루프의 유일한 작업(큐와 콜 스택의 연결)을 수행할 시간입니다! 콜 스택이 비어있다면, 즉 이전에 호출되었던 모든 함수가 값을 반환하고 콜 스택을 빠져나갔다면, 큐에 있는 첫 번째 요소가 콜 스택에 추가됩니다. 이 경우, 다른 함수는 호출되지 않았고, 이는 콜백 함수가 큐의 첫 번째 요소일 때 콜스택이 비어있었음을 의미합니다.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--b2BtLfdz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

콜백 함수가 콜 스택에 추가되고, 호출되고, 값을 반환하고, 스택을 빠져나갑니다.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--NYOknEYi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif)

콜백이 콜 스택에 추가되고 실행되고, 이 값을 반환한 후에 콜스택에서 나오게 됩니다.

예제

```js
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'), 500)
const baz = () => console.log('Third')
bar()
foo()
baz()
```

![](https://res.cloudinary.com/practicaldev/image/fetch/s--BLtCLQcd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif)

1. bar를 호출해서 setTimeout을 반환합니다.
2. setTimeout에 전달한 콜백은 Web API에 추가되고, setTimeout, bar는 콜스택에서 빠져나옵니다.
3. 타이머가 실행되고, 그 동안 foo가 호출되고 "First"를 기록합니다. foo는 undefined를 반환하고, baz가 호출되고, 콜백이 큐에 추가됩니다.
4. baz가 "Third"를 기록합니다. 이벤트 루프는 baz가 값을 반환한 후 콜스택이 비어있음을 확인합니다. 그 후 콜백이 콜스택에 추가됩니다.
5. 콜백이 실행되며 "Second"를 기록합니다.

[출처](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
