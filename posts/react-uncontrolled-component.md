---
title: 'Uncontrolled Component'
date: '2024-07-27'
tag: 'React'
description: 'Uncontrolled Component(비제어 컴포넌트)에 대해 알아보자'
---

# Uncontrolled Component (비제어 컴포넌트)

React의 Uncontrolled Component는 컴포넌트가 자신의 상태를 내부적으로 관리하며, React 상태에 의존하지 않는 컴포넌트입니다. 쉽게 말해, Uncontrolled Component는 폼 데이터를 DOM 자체에 저장합니다.

## 특징

1. 내부 상태 관리: 컴포넌트의 상태(예: input 필드의 값)는 React가 아닌 DOM에 의해 관리됩니다.
2. Ref 사용: input 필드의 현재 값을 접근하기 위해 ref를 사용합니다. Ref는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트를 접근할 수 있는 방법을 제공합니다.
3. 기본값 설정: 초기 값은 defaultValue 속성(input의 경우)이나 defaultChecked 속성(체크박스/라디오 버튼의 경우)을 사용해 설정할 수 있습니다.

[구 공식 문서](https://ko.legacy.reactjs.org/docs/uncontrolled-components.html)

쉽게 말해 상태(`useState`)를 관리하지 않는다고 생각하면 된다.

## Controlled Component

```tsx
// Controlled Component
function App() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ...
  };

  return (
    <div style={{ height: "100lvh", width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-content-center w-full h-full align-items-center"
      >
        <div className="flex flex-column gap-4">
          <InputText value={input} onChange={(e) => setInput(e.target.value)} />

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
```

`Controlled Component` 상태가 완전히 React에 의해 제어된다.

## Uncontrolled Component

벨리데이션이나, 실시간으로 무언가의 작업이 필요하지 않을 경우가 있다.

단순 폼 제출이라든지...

그런 경우 `ref` 통해 관리한다.

```tsx

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current.value();
    ...
  };

  return (
    <div style={{ height: "100lvh", width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-content-center w-full h-full align-items-center"
      >
        <div className="flex flex-column gap-4">
          <InputText ref={inputRef} />

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
```

## 결론

### Uncontrolled Component의 장점

1. 단순한 코드: 상태가 DOM에 의해 관리되므로 코드가 더 단순하고 직관적입니다.
2. 적은 보일러플레이트: 많은 상태 관리 코드를 작성할 필요가 없습니다.

### Uncontrolled Component의 단점

1. 제어의 어려움: 상태가 React에 의해 관리되지 않으므로 컴포넌트의 동작을 제어하고 예측하기가 더 어렵습니다.
2. 복잡한 Ref 관리: 특히 큰 폼에서는 여러 개의 ref를 관리하는 것이 복잡해질 수 있습니다.

### Uncontrolled Component를 사용할 때:

- 간단한 폼: React 상태 관리가 과도할 수 있는 간단한 폼을 다룰 때.

## form onSubmit handler type

> 타입스크립트의 이점을 좀 살려보자면

```tsx
interface FormElements extends HTMLFormControlsCollection {
  sexyValue: HTMLInputElement
}

export interface AppElements extends HTMLFormElement {
  readonly elements: FormElements
}

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent<FilterElements>) => {
    e.preventDefault()
    console.log(e.currentTarget.elements.sexyValue.value)
  }

  return (
    <div style={{height: '100lvh', width: '100%'}}>
      <form
        onSubmit={handleSubmit}
        className='justify-content-center align-items-center flex h-full w-full'>
        <div className='flex-column flex gap-4'>
          <InputText ref={inputRef} name='sexyValue' />

          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  )
}
```

위 코드에서 handleSubmit 함수내에서 e.currentTarget.elements 다음 타입스크립트 자동완성을 통해,
Form 안에 있는 input에 접근할 수 있다.

### checkbox 일 경우

```tsx
interface FormElements extends HTMLFormControlsCollection {
  sexyValue: HTMLInputElement
  checkbox1: HTMLInputElement
  checkbox2: HTMLInputElement
}
export interface FilterElements extends HTMLFormElement {
  readonly elements: FormElements
}

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent<FilterElements>) => {
    e.preventDefault()
    console.log(e.currentTarget.elements.checkbox1.checked) // true
    console.log(e.currentTarget.elements.checkbox2.checked) // false
  }

  return (
    <div style={{height: '100lvh', width: '100%'}}>
      <form
        onSubmit={handleSubmit}
        className='justify-content-center align-items-center flex h-full w-full'>
        <div className='flex-column flex gap-4'>
          <InputText ref={inputRef} name='sexyValue' />
          <input type='checkbox' value='coke' name='checkbox1' />
          <input type='checkbox' value='coke2' name='checkbox2' />

          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  )
}
```

checkbox1만 체크하고 서브밋 버튼을 누르게 되면

각각 `true`, `false` 확인 할 수 있다.

> 즉, HTMLFormElement > HTMLFormControlsCollection 정의한 elements에 접근 할 수 있다.

~~Ref 없이~~

[출처](https://www.epicreact.dev/how-to-type-a-react-form-on-submit-handler)
