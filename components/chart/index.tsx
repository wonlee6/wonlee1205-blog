'use client'

import React, { useCallback, useState } from 'react'

import { ChartType } from '@/types/chart-type'

import Chart from './chart'

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
