---
title: 'ECharts'
date: '2023-04-26'
tag: 'React'
description: 'ECharts 사용법에 대해 간단하게 알아보고, echart-for-react 라이브러리 사용 방법을 알아보자'
---

## 1. ECharts

보고서에서 필수적인? 시각화 표현을 위해 차트를 많이 사용한다.

차트 라이브러리의 종류는 많지만 개인적으로 좋다고 생각하는 것은 `ECharts`, `Nivo`가 있는 것같다.

마침 회사에서 ECharts를 통한 업무를 진행하게 되어 글을 포스팅한다.

## 2. 설치

```
yarn add echarts
```

## 3. 사용 방법

먼저 [공식 홈페이지](https://echarts.apache.org/examples/en/index.html)에 들어가보면,
수 많은 예제들을 확인해볼수있다.

그중에 하나의 예시를 가지고 만들어보자

먼저 컴포넌트를 하나 만든다.

```jsx
// ChartComponent.tsx
export interface ChartComponentModel {
    option: ECharts;
    style?: React.CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark" | null;
    render?: "canvas" | "svg";
}

const ChartComponent = (props: ChartComponentModel) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      let chart: ECharts | undefined;
      if (chartRef.current !== null) {
          chart = init(chartRef.current, props.theme, {renderer: props.render ?? "svg"});
      }
      function resizeChart() {
          chart?.resize();
      }
      window.addEventListener("resize", resizeChart);
      return () => {
          chart?.dispose();
          window.removeEventListener("resize", resizeChart);
      };
  }, [props.theme, props.render]);

  useEffect(() => {
      if (chartRef.current !== null) {
          const chart = getInstanceByDom(chartRef.current);
          chart.setOption(props.option as any, true, true);
      }
  }, [props.option]);

  useEffect(() => {
      if (chartRef.current !== null) {
          const chart = getInstanceByDom(chartRef.current);
          props.loading === true ? (chart as ECharts).showLoading() : (chart as ECharts).hideLoading();
      }
  }, [props.loading, props.theme]);

  return <div ref={chartRef} style={{width: "100%", height: "100%", ...props.style}} />
```

부모 컴포넌트로 부터 차트 옵션을 props로 받고 차트를 그릴 컴포넌트를 만들었다.

간단하게 보면,

- 기본적으로 `renderer` 옵션을 통해 `svg`, `canvas`를 설정할 수 있다
- theme 종류 에도 `default`, `light`, `dark` 설정 할 수 있으며, 추가적인 theme은 공식 홈페이지 가이드를 통해 추가 가능하다.
- 로딩 스피너도 활용 가능
- resize

## 4. Charts for react

위 방법으로도 충분하지만 좀 더 편하게 작업할 수 있게(React 환경에서) 도와주는 라이브러리가 있다.

```
yarn add echarts-for-react
```

설치 완료 후

```tsx
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import type {SetOptionOpts} from 'echarts'

const ChartComponent = (props: ChartComponentModel) => {
  return (
    <ReactECharts
      echarts={echarts}
      notMerge={true}
      lazyUpdate={true}
      opts={{
        renderer: props.render ?? 'svg'
      }}
      option={props.option}
      showLoading={loading}
      style={{width: '100%', height: '100%', ...props.style}}
      theme={props.theme}
    />
  )
}

export default ChartComponent
```

위 처럼 간단하게 만들 수 있다.

각각의 옵션들에 대한 정보는 [여기](https://github.com/hustcc/echarts-for-react)를 통해 확인하면 된다.

만약 Pie 타입일 때, 선택한 영역에 대한 정보를 가져오기 위해서는

```jsx
const handleClick = (params: any) => {
  console.log(params)
}
const onEvent = {
  click: handleClick
}
return (
  <ReactECharts
    onEvents={onEvent}
    echarts={echarts}
    notMerge={true}
    lazyUpdate={true}
    opts={{
      renderer: props.render ?? 'svg'
    }}
    option={props.option}
    className='w-100 h-100'
    showLoading={loading}
    style={{width: '100%', height: '100%', ...props.style}}
    theme={props.theme}
  />
)
```

`onEvents`의 click 이벤트 통해 데이터 확인 가능

끝.
