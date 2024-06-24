'use client'

import {ChartHelper} from '@/helper/ChartHelper'
import {ChartType} from '@/model/Chart.model'
import {Button} from '@nextui-org/react'

type Props = {
  selectedMenu: ChartType
  onMenuClick: (menu: ChartType) => void
}

export default function ChartTypeList(props: Props) {
  const {selectedMenu, onMenuClick} = props

  return (
    <div className='w-1/6 pt-4 max-lg:hidden'>
      {ChartHelper.getChartMenuList().map((item) => (
        <Button
          key={item.name}
          color={selectedMenu === item.name ? 'primary' : 'default'}
          variant='shadow'
          onClick={() => onMenuClick(item.name)}
          className='mb-4 w-full'>
          {item.name}
        </Button>
      ))}
    </div>
  )
}
