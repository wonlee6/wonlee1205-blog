'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import type {EChartsOption} from 'echarts'

/**
 *  @deprecated
 *  @description echarts-for-react 사용하기 위한 컴포넌트, 2024-06-30 사용안함
 *
 */
type Props = {
  option: EChartsOption | null
  theme?: 'dark' | 'light' | undefined
  height?: string
}

export default function PreviewChart(props: Props) {
  return (
    <ReactECharts
      option={props.option ?? {}}
      notMerge={true}
      lazyUpdate={true}
      theme={props.theme}
      opts={{
        renderer: 'svg'
      }}
      style={{height: props.height ?? '41rem', width: '100%'}}
      echarts={echarts}
    />
  )
}
