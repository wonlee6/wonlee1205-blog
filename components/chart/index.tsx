'use client'

import React, {useCallback, useState} from 'react'

import {ChartType} from '@/model/Chart.model'
import Charts from './charts'

export default function ChartClient() {
  const [selectedMenu, setSelectedMenu] = useState<ChartType>(ChartType.Line)

  const handleMenuClick = useCallback((menu: ChartType) => {
    setSelectedMenu(menu)
  }, [])

  return (
    <>
      <Charts>
        <Charts.MenuList selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
        <Charts.List selectedMenu={selectedMenu} />
      </Charts>
    </>
  )
}
