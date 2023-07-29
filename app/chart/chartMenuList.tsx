'use client'

import {ChartHelper} from '@/helper/ChartHelper'
import React from 'react'
import NextUIButton from './nextUIButton'

export default function ChartMenuList() {
  return (
    <div>
      {ChartHelper.getChartMenuList().map((item) => (
        <NextUIButton key={item.name} title={item.name} />
      ))}
    </div>
  )
}
