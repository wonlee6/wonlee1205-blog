'use client'

import React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import type {EChartsOption} from 'echarts'

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
