'use client'

import React, { useCallback, useState } from 'react'

import Chart from './chart'
import { ChartType } from '@/model/Chart.model'

export default function ChartClient() {
  const [selectedMenu, setSelectedMenu] = useState<ChartType>(ChartType.Line)

  const handleMenuClick = useCallback((menu: ChartType) => {
    setSelectedMenu(menu)
  }, [])

  return (
    <>
      <Chart>
        <Chart.MenuList selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
        <Chart.List selectedMenu={selectedMenu} />
      </Chart>
    </>
  )
}
