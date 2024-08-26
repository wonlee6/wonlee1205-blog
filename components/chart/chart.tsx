import React from 'react'

import ChartList from './chart-list'
import ChartMenuList from './chart-menu-list'

function Chart({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto mb-4 flex max-w-7xl flex-col p-4'>
      <div className='flex w-full max-lg:flex-col'>{children}</div>
    </div>
  )
}

Chart.MenuList = ChartMenuList
Chart.List = ChartList
export default Chart
