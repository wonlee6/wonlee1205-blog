'use client'

import React from 'react'
import {ChartHelper} from '@/helper/ChartHelper'
import {Button} from '@nextui-org/react'

export default function ChartMenuList() {
  return (
    <div>
      {ChartHelper.getChartMenuList().map((item) => (
        <Button key={item.name} title={item.name} />
      ))}
    </div>
  )
}
