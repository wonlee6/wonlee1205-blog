---
title: 'Recoil - 실전 활용과 구조 고민'
date: '2024-06-24'
tag: ['recoil']
description: 'Recoil - 실전 활용과 구조 고민'
---

# Recoil - 실전 활용과 구조 고민

회사에서 `Recoil`을 2년 넘게 사용하면서 어느 정도 익숙해졌습니다.
이번 글에서는 다양한 시도 끝에 정착하게 된 Recoil 사용 방식과 구조적인 고민을 정리해보려 합니다.

## Recoil 도입 초기

처음 `Recoil`을 사용할 때는 공식 문서에 나온 대로 `atom`, `atomFamily`, `selector`, `selectorFamily` 등을 단순하게 적용했습니다. 하지만 실제 업무에서는 점점 복잡한 상황에 직면하게 되고, 그 과정에서 보다 효율적인 상태 관리를 위해 지속적으로 리팩토링을 진행하게 됩니다.

## 도메인별 Recoil 함수 분리

예를 들어, 아래와 같이 하나의 도메인에 필요한 Recoil 관련 로직을 함수로 묶어 사용하는 방식을 시도했습니다:

```ts showLineNumbers
// 예시: 도메인별 recoil 상태 접근 함수
export const recoilFn = () => ({
  recoilCallback: useRecoilCallback,
  selectedChartType: useRecoilValue(chartType),
  chartState: simpleChartSelectedItem,
  readonly: useRecoilValue(chartReadonly),
  ...
});
```

```ts showLineNumbers
// 예시: 컴포넌트 내부에서 활용
export default function ChartOverlay(props: Props) {
  const { selectedChartItem } = chartRecoilFn();

  const hideOverlay = () => {
    props.setVisible(false);
  };

  return (
    <Modal
      header={<h5 style={{ fontSize: "1rem" }}>{$II.viewCode}</h5>}
      visible={props.visible}
      onHide={hideOverlay}
      style={{ width: "80vh", height: "90vh" }}
      footer={
        <div className="w-100 mt-2 mb-2 d-flex justify-content-end">
          <Modal.CloseBtn onClick={hideOverlay} />
        </div>
      }
    >
      ...
    </Modal>
  );
}
```

**장점**: 관련된 Recoil 상태를 하나의 함수에서 집중적으로 다룰 수 있어 코드 가독성이 높아지고, `import`가 줄어듭니다.  
**단점**: 재사용성이 떨어지고, 상태가 많아질수록 함수가 복잡해져 유지보수가 어려워집니다. 적절한 분리가 필요합니다.

### 커스텀 훅으로 로직 분리

최근에는 **UI 로직은 컴포넌트에, 비즈니스 로직은 커스텀 훅으로 분리하는 구조**를 주로 사용하고 있습니다.

```ts showLineNumbers
const usePortal = (): ReturnPortalModel => {
  const portalState = useRecoilValue(portalAtom)

  const handleSelectConfigItem = useRecoilCallback(
    ({ set }) =>
      (config: BaseConfigModel) => {
        set(portalAtom, (prev) => ({ ...prev, selectedConfigItem: config }))
      },
    []
  )

  const handleAddConfigItem = useRecoilCallback(
    ({ set }) =>
      async (name: string, description: string) => {
        const createConfigItem: BaseConfigModel = {
          id: StringHelper.randomString(33),
          name,
          description
        }

        set(portalAtom, (prev) => ({
          ...prev,
          selectedConfigItem: createConfigItem,
          configList: [...prev.configList, createConfigItem],
          isShowLeftPanel: false,
          checkedOut: false
        }))
      },
    []
  )

  return {
    isShowLeftPanel: portalState.isShowLeftPanel,
    onSelectConfigItem: handleSelectConfigItem,
    onAddConfigItem: handleAddConfigItem
  }
}

export default usePortal
```

이 방식은 로직을 한 곳에 모아두기 때문에 테스트와 유지보수가 쉬워지고, UI 코드와의 분리도 명확해집니다.

## `selector`를 활용한 구조화 시도

한때는 Recoil 파일 내부에서 `selector`를 활용해 로직을 모아 관리하려고 했습니다:

```ts showLineNumbers
const selector = selector<SelectorModel>({
  key: '___selector',
  get: ({ getCallback }) => {
    const onShowLeftPanel = getCallback(({ set }) => () => {
      set(portalAtom, (prev) => ({ ...prev, isShowLeftPanel: !prev.isShowLeftPanel }))
    })

    const onFetchConfigList = getCallback(({ set }) => (configList: MockupConfigModel[]) => {
      set(portalAtom, (prev) => ({ ...prev, configList }))
    })

    const onSelectConfigItem = getCallback(({ set }) => (config: MockupConfigModel) => {
      set(portalAtom, (prev) => ({ ...prev, selectedConfigItem: config }))
    })

    return {
      onShowLeftPanel,
      onFetchConfigList,
      onSelectConfigItem
    }
  }
})
```

그러나 이 구조는 실제로는 문제가 있었습니다. Recoil 버그로 인해 `getCallback`이 재실행되지 않는 문제가 발생했고, 실사용이 어려웠습니다. 결국 이 구조는 포기하고, 다시 커스텀 훅 중심으로 로직을 관리하게 되었습니다.

## 마무리하며

Recoil은 업데이트가 멈춘 상태이며, 언젠가는 다른 상태 관리 라이브러리로 마이그레이션해야 할 시점이 올 것입니다.
그런 점에서 `zustand`, `jotai`, `valtio` 등 경량 상태 관리 도구들도 틈틈이 살펴보고 있습니다.
