'use client'

import { Button } from '@nextui-org/react'

import { ChartHelper } from '@/helper/chart.Helper'
import { ChartType } from '@/types/chart-type'

type Props = {
  selectedMenu: ChartType
  onMenuClick: (menu: ChartType) => void
}

export default function ChartMenuList(props: Props) {
  const { selectedMenu, onMenuClick } = props

  return (
    <div className='flex w-1/6 flex-col gap-4 pt-4 max-lg:w-full max-lg:flex-row max-lg:pb-8'>
      {ChartHelper.getChartMenuList().map((item) => (
        <Button
          key={item.name}
          color={selectedMenu === item.name ? 'primary' : 'default'}
          variant='shadow'
          onPress={() => onMenuClick(item.name)}
          className='w-full'>
          {item.name}
        </Button>
      ))}
    </div>
  )
}
