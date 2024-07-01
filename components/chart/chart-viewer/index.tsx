'use client'

import React, {useEffect, useState} from 'react'
import MonacoEditor from './monaco-editor'
import {Spinner} from '@nextui-org/react'

type props = {
  url: string
  getChartType: string
}

export default function ChartView({url, getChartType}: props) {
  const [value, setValue] = useState('')
  const [jsonData, setJsonData] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        if (url === 'confidence-band' || url === 'line-race') {
          const responseJsonData = await fetch(`/data/${url}.json`)
          const jsonData = await responseJsonData.json()
          setJsonData(jsonData)
        }

        const responseChartData = await fetch(`/data/${url}.ts`, {method: 'get'})
        const chartData = await responseChartData.text()

        setValue(chartData)
      } catch (e) {
        console.error(e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (value === '') {
    return (
      <div className='flex size-full items-center justify-center'>
        <Spinner size='lg' label='Loading...' />
      </div>
    )
  }

  return (
    <>
      <div className='flex size-full rounded bg-default-200 max-md:flex-col'>
        <div className='h-full w-1/2 p-2 max-md:h-1/2 max-md:w-full'>
          <MonacoEditor value={value} fetchData={jsonData} fetchType={getChartType} />
        </div>
        <div className='h-full w-1/2 p-2 max-md:h-1/2 max-md:w-full'>
          <div id='chart' className='relative size-full rounded-sm bg-white p-4'></div>
        </div>
      </div>
    </>
  )
}
