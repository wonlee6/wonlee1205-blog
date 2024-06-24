import React from 'react'
import ChartTypeList from './chart-type-list'

function Charts({children}: {children: React.ReactNode}) {
  return <div className='mx-auto flex max-w-7xl flex-col'>{children}</div>
}

Charts.TypeList = ChartTypeList
export default Charts
