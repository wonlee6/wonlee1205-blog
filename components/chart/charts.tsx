import React from 'react'
import ChartList from './chart-list'
import ChartMenuList from './chart-menu-list'

function Charts({children}: {children: React.ReactNode}) {
  return (
    <div className='mx-auto mb-4 flex max-w-7xl flex-col'>
      <div className='flex w-full max-lg:flex-col'>{children}</div>
    </div>
  )
}

Charts.MenuList = ChartMenuList
Charts.List = ChartList
export default Charts
