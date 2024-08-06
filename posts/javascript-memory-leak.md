---
title: 'javascrip 메모리 누수 with react'
date: '2024-08-06'
tag: ['javascript', 'react']
description: 'javascript and react memory leak (closures)'
---

## javascript memory leak

```js
class BigObject {
  data = new Uint8Array(1024 * 1024 * 100) // 100mb
}

function demo() {
  const bigObject = new BigObject()

  const id = setTimeout(() => {
    console.log(bigObject.data.length)
  }, 1000)

  return () => clearTimeout(id)
}

globalThis.testDemo = demo()
```

위 코드는 메모리 누수가 지속되는 코드 이유는:

- 1초 후 `bigObject` 참조하는 함수를 더 이상 호출할 수 없음
- return 함수는 `bigObject` 참조하지 않음

[![task1.png](https://i.postimg.cc/xCmVYpSz/task1.png)](https://postimg.cc/N9Qzk4Fs)
heap memory 체크 하게 되면 위 사진과 같이 `BigObject`를 확인할 수 있음

```js
class BigObject {
  data = new Uint8Array(1024 * 1024 * 100) // 100mb
}

function demo() {
  const bigObject = new BigObject()

  const id = setTimeout(() => {
    console.log(bigObject.data.length)
  }, 1000)

  return () => clearTimeout(id)
}
// total = 10
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
globalThis.testDemo = demo()
```

10개를 추가해서 확인하면

[![task2.png](https://i.postimg.cc/tJHQgdXm/task2.png)](https://postimg.cc/7GXQs2Jg)

`BigObject * 10` 확인할 수 있음.

```js
class BigObject {
  data = new Uint8Array(1024 * 1024 * 100) // 100mb
}

function demo() {
  const bigObject = new BigObject()

  const id = setTimeout(() => {
    console.log(bigObject.data.length)
  }, 1000)

  return () => clearTimeout(id)
}
// total = 10
globalThis.testDemo = demo()
globalThis.testDemo = undefined
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
// globalThis.testDemo = demo();
```

memory 누수를 없애기 위해서(가비지 수집) `undefined` 할당

[![task3.png](https://i.postimg.cc/B6KSncKd/task3.png)](https://postimg.cc/R6v5PtGR)
위와 같이 메모리 사용량이 확 준 것을 확인할 수 있음. (GC로 인해)

정리하면

- js 엔진은 `BigObject`가 내부 함수에 의해 참조되는 것을 인식하므로 계속 유지가 됨.
- `demo()`가 호출될 때 생성된 스코프와 연관되어 있음
- 1초가 지나면 `BigObject`를 참조하는 함수는 더 이상 호출할 수 없음
- 하지만 `return`함수는 여전히 호출할 수 있기 때문에 스코프는 유지되어 있음
- `BigObject`는 스코프와 연관되어 있으므로 메모리에 남아 있음

그럼 결론이 `setTimer`의 문제냐? 그렇지 않음

```js
function demo() {
  console.log('inside demo')

  const bigObject = new BigObject()

  globalThis.innerFunc1 = () => {
    console.log(bigObject.data.length)
  }

  globalThis.innerFunc2 = () => {
    console.log('hello from innerFunc2')
  }
}
demo()
```

클로저(Closure)의 환경에서도 테스트 결과

동일한 결과를 확인할 수 있음.

그럼 위 예시에서 `bigObject`를 참조하는 `innerFunc1`내부 함수를 `undefined`로 제거하면 누수가 해결되겠네?

```js
function demo() {
  console.log('inside demo')

  const bigObject = new BigObject()

  globalThis.innerFunc1 = () => {
    console.log(bigObject.data.length)
  }

  globalThis.innerFunc2 = () => {
    console.log('hello from innerFunc2')
  }
}
demo()

globalThis.innerFunc1 = undefined
```

[![task4.png](https://i.postimg.cc/P5905GQ5/task4.png)](https://postimg.cc/5X5ssRrh)

결과는 여전히 `heap memory`에 남아 있음.

```js
function demo() {
  console.log('inside demo')

  const bigObject = new BigObject()

  globalThis.innerFunc1 = () => {
    console.log(bigObject.data.length)
  }

  globalThis.innerFunc2 = () => {
    console.log('hello from innerFunc2')
  }
}
demo()

globalThis.innerFunc1 = undefined
globalThis.innerFunc2 = undefined
```

클로저 환경에서 해결하기 위해서는 inner 함수 둘다 해야 됨

클로저에 대해 알아보면

> MDN: 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

위 정의에서 말하는 “함수”란 반환된 내부함수를 의미하고 “그 함수가 선언될 때의 렉시컬 환경(Lexical environment)”란 내부 함수가 선언됐을 때의 스코프를 의미한다. 즉, **클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수**를 말한다. 이를 조금 더 간단히 말하면 **클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수다**

클로저에 의해 참조되는 외부함수의 변수 즉 outerFunc 함수의 변수 x를 **자유변수(Free variable)**라고 부른다. 클로저라는 이름은 자유변수에 함수가 닫혀있다(closed)라는 의미로 의역하면 자유변수에 엮여있는 함수라는 뜻이다.

[실행 컨텍스트](https://poiemaweb.com/js-execution-context)의 관점에 설명하면, 내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 반환되어도, 외부함수 실행 컨텍스트 내의 **활성 객체(Activation object)**(변수, 함수 선언 등의 정보를 가지고 있다)는 **내부함수에 의해 참조되는 한 유효**하여 내부함수가 **스코프 체인**을 통해 참조할 수 있는 것을 의미한다.

즉 외부함수가 이미 반환되었어도 외부함수 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의하여야 한다.

![클로저](https://poiemaweb.com/img/closure.png)

이렇게 클로저에 대해 정의하는 부분을 확인하고 정리하면,

함수가 만들어지고 외부함수 내의 변수가 내부 함수가 `bigObject`를 계속해서 참조하고 있어 동일한 컨텍스트에서 계속 참조되고 있지 않나 생각이 든다.

## React

```jsx
import {useCallback, useEffect, useState} from "react";
import "./App.css";

class BigObject {
	public readonly data = new Uint8Array(1024 * 1024 * 10);
}

const App = () => {
	const [countA, setCountA] = useState(0);
	const [countB, setCountB] = useState(0);

	const bigData = new BigObject(); // 10MB

	const handleClickA = useCallback(() => {
		setCountA(countA + 1);
	}, [countA]);

	const handleClickB = useCallback(() => {
		setCountB(countB + 1);
	}, [countB]);

	const handleClickBoth = () => {
		handleClickA();
		handleClickB();
		console.log(bigData.data.length);
	};

	return (
		<>
			<div>
				<button onClick={handleClickA}>Increment A</button>
				<button onClick={handleClickB}>Increment B</button>
				<button onClick={handleClickBoth}>Increment Both</button>
				<p>
				A: {countA}, b: {countB}
				</p>
			</div>
		</>
	);
}

export default App;
```

React에서 가비지 컬렉터가 되지 않는 예제이다

만약 `Increment A` 또는 `Increment B`버튼을 번갈아가면서 누르게 된다면 결과는 어떻게 될까?

![image](https://schiener.io/assets/img/bigobject-leak-useCallback.png)

결과는 가비지 수집되지 않는다. 클릭할 때마다 메모리 사용량이 증가되는것을 확인할 수 있다.

왜 그런지 알아보면  
 0. 처음 마운트가 될 때(first render)  
App 컴포넌트가 렌더링이 되고나서 클로저는 모든 변수에 대한 참조를 포함하는 클로저 스코프가 생성된다.  
 `bigObjectData`, `handleClickA()`, `handleClickB()` 이 변수들은 `handleClickBoth()`에서 참조하고 있다.

![first-render](https://schiener.io/assets/img/closure-chain-0.png)

1. `Increment A`버튼을 클릭

- `Increment A`버튼을 클릭하면 `countA`가 변경되므로 `handleClickA()`가 다시 생성 <- 새 `handleClickA()`을 `handleClickA()#1` 라고 하고
- `countB`는 변경되지 않았으므로 `handleClickB()#0`은 여전히 App Scope#0에 대한 참조를 보유한다는 것을 의미
- 새로운 `handleClickA()#1`은

![click-increment-a](https://schiener.io/assets/img/closure-chain-1.png)

2. `Increment B`버튼을 클릭

- `Increment B`버튼을 클릭하면 `countB`가 변경되므로 `handleClickB()`가 다시 생성되어 `handleClickB()#1`이 생성된다.
- `countA`가 변경되지 않았기 때문에 React는 `handleClickA()`를 다시 생성하지 않음
- 따라서 `handleClickB()#1`은 `handleClickA()#1`에 대한 참조를 보유한 `AppScope#2`에 대한 참조를 보유하게 되고, `handleClickB()#0`에 대한 참조를 보유한 `AppScope#1`에 대한 참조를 보유하게 된다.

![click-incrementB](https://schiener.io/assets/img/closure-chain-2.png)

3. 다시 `Increment A`버튼을 클릭  
   이렇게 하면 서로를 참조하는 끝없는 클로저 체인을 만들 수 있고, 렌더링할 때마다 다시 생성되므로 별도의 10MB 빅 데이터 오브젝트를 들고 다니면서 가비지 수집을 하지 않게 된다.

![reclick](https://schiener.io/assets/img/closure-chain.png)

### 요약하면

일반적인 문제는 단일 컴포넌트의 서로 다른 `useCallback` 훅이 클로저 범위를 통해 서로 다른 값비싼 데이터를 참조할 수 있다는 것이다. 그러면 클로저는 `useCallback` 훅이 다시 생성될 때까지 메모리에 보관된다. 컴포넌트에 사용 콜백 훅이 두 개 이상 있으면 무엇이 메모리에 유지되고 언제 해제되는지 추론하기가 매우 어렵다. 콜백이 많을수록 이 문제가 발생할 가능성이 높아진다.

### 이러한 문제가 발생할 가능성이 높은 몇가지로

- 많은 `state`를 관리 하는 컴포넌트
- 리렌더링을 최소화하기 위해 `useCallback` 사용
- 메모이제이션한 함수에서 다른 함수를 호출
- 이미지 데이터나 큰 배열과 같은 큰 객체를 처리하는 경우

큰 객체를 처리할 필요가 없다면 몇 개의 문자열이나 숫자를 추가로 참조해도 문제가 되지 않을 수 있음.
이러한 클로저 상호 참조는 대부분 프로퍼티가 충분히 변경된 후에 해결된다. 다만 앱이 예상보다 많은 메모리를 차지할 수 있다는 점에 유의.

### 클로저와 useCallback 의 메모리 누수 방지하는 방법

1. 클로저 스코프를 최소화한다.
   1. 컴포넌트를 작게 만든다.
   2. `custom hook`을 사용. > Because then any callback can only close over the scope of the hook function. This will often only mean the function arguments.
2. 다른 클로저를 캡처하지 않기. 특히 메모화된 클로저
3. 필요하지 않을 때는 메모이제이션을 사용하지 말기  
   `useCallback`, `useMemo`는 불필요한 리렌더링을 막을 수 있지만 항상 비용이 발생함. 문제가 발생한 경우에만 사용
4. 큰 오브젝트는 `useRef`를 사용  
   오브젝트의 수명주기를 직접 처리하고 적절하게 정리해야 한다는 것을 의미. (최적의 방법은 아니지만 메모리가 누수되는 것보다 나음)

### 결론

클로저는 React에서 많이 사용되는 패턴이다. 이를 통해 컴포넌트가 마지막으로 렌더링되었을 때 범위 내에 있던 프로퍼티와 상태를 함수가 기억할 수 있다. 이는 특히 큰 객체로 작업할 때 `useCallback`과 같은 메모이제이션 기법과 결합하면 예기치 않은 메모리 누수로 이어질 수 있습니다. 이러한 메모리 누수를 방지하려면 클로저 범위를 최대한 작게 유지하고, 필요하지 않을 때는 메모화를 피하고, 큰 객체의 경우 `useRef`로 사용해보자.

[참조1](https://schiener.io/2024-03-03/react-closures) [참조2](https://jakearchibald.com/2024/garbage-collection-and-closures/) 사이트를 보고 작성하였음

직접 메모리 부분을 눈으로 확인하면서 테스트를 해보니 재미있었다. ㅎㅎ

~~혹시 테스트한다면 Increment A, Increment B 번갈아가면서 클릭.~~
