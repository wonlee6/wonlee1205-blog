---
title: 'Recoil - atomFamily 활용하기'
date: '2024-06-24'
tag: 'Recoil'
description: 'Recoil atomFamily 좀 더 적극적으로 활용해보기'
---

~~회사에서 `Recoil`을 사용하면서 발생한 특정 유즈케이스 기록~~   
`Atom` 값이 변경되면 해당 아톰 값을 바라보는 `atomFamily` 초기 값을 셋팅하는 방법

### AtomFamily 정의
atomFamily는 기본적으로 매개변수에서 atom으로의 맵을 제공합니다. atomFamily에 단일 키만을 제공하면, 각 기본 atom에 대해 고유한 키가 생성됩니다. 이 atom 키는 지속성을 사용될 수 있으므로 어플리케이션 실행 전반에 걸쳐 안정적이여야 합니다. 매개 변수는 다른 호출 지점에서도 생성될 수 있으며 동일한 매개변수가 동일한 기본 atom을 갖기를 원합니다. 그래서, atomFamily에서는 참조 동등성 대신 값 동등성을 사용합니다. 이는 매개 변수에 사용할 수 있는 타입을 제한하게 됩니다. atomFamily는 원시 타입, 배열, 또는 배열, 원시 타입을 갖는 객체를 허용합니다.

```ts
function atomFamily<T, P: Parameter>({
  key: string,

  default?:
    | T
    | Promise<T>
    | Loadable<T>
    | WrappedValue<T>
    | RecoilValue<T>
    | (P => T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>),

  effects?:
    | $ReadOnlyArray<AtomEffect<T>>
    | (P => $ReadOnlyArray<AtomEffect<T>>),

  dangerouslyAllowMutability?: boolean,
}): P => RecoilState<T>
```

나는 여기서 atomFamily 값이 생길 때 처음 init 값을 api를 통해 값을 가져 온후 셋팅하고 싶었다.

React의 useEffect 처럼 마운트를 했을 때 값을 셋팅하는 방법을 찾는 도중, `Effects`에 한 번 알아보기로 하고 방법을 찾아보았다.

### Atom Effects

Atom Effects는 부수효과를 관리하고 Recoil의 atom을 초기화 또는 동기화하기 위한 API입니다. Atom Effects는 state persistence(상태 지속성), state synchronization(상태 동기화), managing history(히스토리 관리), logging(로깅) 등등 유용한 어플리케이션을 여럿 가지고 있습니다. 이는 React effects와도 유사하지만, Atom Effects는 atom 정의의 일부로 정의되므로 각 atom은 자체적인 정책들을 지정하고 구성할 수 있습니다.


```ts
type AtomEffect<T> = ({
  node: RecoilState<T>, // A reference to the atom itself
  storeID: StoreID, // ID for the <RecoilRoot> or Snapshot store associated with this effect.
  trigger: 'get' | 'set', // The action which triggered initialization of the atom

  // Callbacks to set or reset the value of the atom.
  // This can be called from the atom effect function directly to initialize the
  // initial value of the atom, or asynchronously called later to change it.
  setSelf: (
    | T
    | DefaultValue
    | Promise<T | DefaultValue> // Only allowed for initialization at this time
    | ((T | DefaultValue) => T | DefaultValue),
  ) => void,
  resetSelf: () => void,

  // Subscribe to changes in the atom value.
  // The callback is not called due to changes from this effect's own setSelf().
  onSet: (
    (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void,
  ) => void,

  // Callbacks to read other atoms/selectors
  getPromise: <S>(RecoilValue<S>) => Promise<S>,
  getLoadable: <S>(RecoilValue<S>) => Loadable<S>,
  getInfo_UNSTABLE: <S>(RecoilValue<S>) => RecoilValueInfo<S>,
}) => void | () => void; // Optionally return a cleanup handler
```

#### 예시

```ts
const myState = atom({
  key: 'MyKey',
  default: null,
  effects: [
    () => {
      ...effect 1...
      return () => ...cleanup effect 1...;
    },
    () => { ...effect 2... },
  ],
});
```

### 실전 활용

```ts
// something atomFamily
type Person = {
  name: string
  age: number
}
const somethingAtom = atomFamily<Person, string>({
    key: "somethingAtom",
    default: {
      name: "",
      age: 0
    },
    effects: (id: string | undefined) => [
        getInitData(id),
        () => {
            // clean up
        }
    ]
});
```
위 코드를 보면 `effects` 파라미터로 `id`를 넘겨주고 `getInitData` 함수를 호출한다.   
바로 밑은 clean up fn 들어가는 위치

```ts
const fetchDataById = async (id: string, type: MPortalType): Promise<Person> => {
  try {
    return await Service.getDataById({id});
  } catch (error) {
    console.error(error);
  }
};

const getInitData =
    (id: string | undefined): AtomEffect<Person> =>
    ({setSelf, trigger, getLoadable, onSet}) => {
            if (trigger === "get" && id != null) { // Avoid expensive initialization
            const someAtomData = getLoadable(someAtom);

            fetchDataById(id)
              .then((response) => setSelf({
                  name: response.name,
                  age: response.age
              })
            );
        }
    };
```
위와 같은 함수를 만들었고 확인해보면   
- `trigger`를 이용하여 비용이 많이 드는 초기화 방지
- `someAtom` 값을 `getLoadable` 통해 가져온다.
- `fetchDataById` 함수 실행하여 값 셋팅

> 참고로 setSelf 와 onSet은 하나만 실행됨

이렇게 간단하게 useEffect 처럼 다루는 방법을 적용시켜보았고, 공식 홈페이지에 여러 케이스에 따라 예시와 함께 설명되어 있으니
한번쯤 확인해보면 좋을거같다.

> [atom-effects 바로가기](https://recoiljs.org/ko/docs/guides/atom-effects)
