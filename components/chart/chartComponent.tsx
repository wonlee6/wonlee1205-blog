'use client'

import React, {useCallback, useMemo, useRef, useState} from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {Button} from '@nextui-org/react'
import type {EChartsOption} from 'echarts'
import {Tabs, Tab} from '@nextui-org/tabs'
import ArrowDown from '@/public/images/arrow-down.svg'

import {ChartType} from '@/model/Chart.model'
import {ChartHelper} from '@/helper/ChartHelper'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import ChartTypeList from './chart-type-list'

const MonacoEditor = dynamic(() => import('./monacoEditor'), {ssr: false})
const PreviewChart = dynamic(() => import('./previewChart'), {ssr: false})
const ChartListItem = dynamic(() => import('./chartListItem'), {ssr: false})

export default function ChartComponent({echartsTypes}: {echartsTypes: string}) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const echartTypeRef = useRef(echartsTypes)

  const entry = useIntersectionObserver(editorRef, {
    threshold: 0.5,
    freezeOnceVisible: true
  })
  const isVisble = entry?.isIntersecting

  const [activeTabView, setActiveTabView] = useState<string | number>('list')

  const [selectedMenu, setSelectedMenu] = useState<ChartType>(ChartType.Line)

  const [chartOption, setChartOption] = useState<EChartsOption | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined)

  const [editorContent, setEditorContent] = useState('')
  const [fetchJsonData, setFetchJsonData] = useState(null)

  const handleMenuClick = useCallback(
    (menu: ChartType) => {
      setSelectedMenu(menu)
      if (activeTabView === 'preview') {
        setActiveTabView('list')
      }
      setChartOption(null)
      setTheme(undefined)
      setEditorContent('')
      setFetchJsonData(null)
    },
    [activeTabView]
  )

  const handleChartClick = async (chartIndex: number, url: string) => {
    const findChartDataList = ChartHelper.getChartListData(selectedMenu)
    const findChartItem = findChartDataList.find((_, index) => index === chartIndex)
    setActiveTabView('preview')
    setChartOption(findChartItem ? findChartItem : null)

    const regUrl = url.split('images/')[1].replace(/\.(.*)/, '')
    if (regUrl === 'confidence-band' || regUrl === 'line-race') {
      const responseJsonData = await fetch(`/data/${regUrl}.json`)
      const jsonData = await responseJsonData.json()
      setFetchJsonData(jsonData)
    } else {
      setFetchJsonData(null)
    }

    const responseChartData = await fetch(`/data/${regUrl}.ts`)
    const chartData = await responseChartData.text()
    setEditorContent(chartData)
  }

  const handleThemeClick = useCallback((selectedTheme: 'dark' | 'light' | 'default') => {
    setTheme(selectedTheme === 'default' ? undefined : selectedTheme)
  }, [])

  const filteredChartImages = useMemo(() => {
    return ChartHelper.getChartList(selectedMenu)
  }, [selectedMenu])

  return (
    <div className='mx-auto mb-4 flex max-w-7xl flex-col'>
      <div className='flex w-full'>
        <ChartTypeList selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />
        <div className='mx-auto w-5/6 pl-4 max-lg:w-full'>
          <Tabs
            className='pl-3'
            selectedKey={activeTabView}
            onSelectionChange={(e) => {
              setEditorContent('')
              setFetchJsonData(null)
              setActiveTabView(e)
            }}
            size='lg'
            radius='sm'
            variant='solid'>
            <Tab key={'menu'} title='Chart Menu' className='hidden max-lg:flex'>
              <div className='flex w-full flex-col items-center'>
                {ChartHelper.getChartMenuList().map((item) => (
                  <div key={item.name} className='flex w-1/2 justify-center'>
                    <Button
                      color={selectedMenu === item.name ? 'primary' : 'secondary'}
                      onClick={() => {
                        setActiveTabView(1)
                        setSelectedMenu(item.name)
                      }}
                      className='mb-4 w-full'>
                      {item.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab key={'list'} title='Chart List'>
              <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3'>
                {filteredChartImages.map((i, index) => (
                  <ChartListItem
                    key={i.title}
                    index={index}
                    title={i.title}
                    url={i.url}
                    onChartClick={handleChartClick}
                  />
                ))}
              </div>
            </Tab>
            <Tab
              key={'preview'}
              title='Preview'
              style={{color: activeTabView === 'preview' ? '#2196F3' : 'black'}}>
              {chartOption ? (
                <>
                  <div className='mb-3 flex w-full justify-center'>
                    <Button
                      className='mr-2'
                      color='primary'
                      variant='ghost'
                      onClick={() => handleThemeClick('default')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Default
                    </Button>
                    <Button
                      color='primary'
                      variant='ghost'
                      className='mr-2 max-sm:w-12'
                      onClick={() => handleThemeClick('light')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Light
                    </Button>
                    <Button
                      className='max-sm:w-8'
                      color='primary'
                      variant='ghost'
                      onClick={() => handleThemeClick('dark')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Dark
                    </Button>
                  </div>
                  <PreviewChart option={chartOption} theme={theme} />
                </>
              ) : (
                <p className='text-center text-default-600'>
                  {!editorContent && !chartOption ? '선택된 아이템이 없습니다.' : ''}
                </p>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <div
        className='mb-2 mt-4 hidden h-full animate-bounce justify-center max-lg:flex'
        style={{
          visibility:
            activeTabView === 'preview' && editorContent && !isVisble ? 'visible' : 'hidden'
        }}>
        <Image src={ArrowDown} alt='arrow-down' width={60} height={60} />
      </div>
      {activeTabView === 'preview' && editorContent ? (
        <div
          ref={editorRef}
          className='mx-auto flex w-full bg-zinc-300 p-4 max-lg:flex-col'
          style={{
            height: '50rem'
          }}>
          <div className='mr-2 h-full w-full border max-lg:h-1/2 lg:w-1/3 xl:w-1/2'>
            {editorContent ? (
              <MonacoEditor
                value={editorContent}
                fetchData={fetchJsonData}
                fetchType={echartTypeRef.current}
              />
            ) : null}
          </div>
          <div className='ml-2 h-full w-full max-lg:ml-0 max-lg:mt-8 max-lg:h-1/2 lg:w-2/3 xl:w-1/2'>
            <div id='chart' className='relative h-full w-full rounded-lg bg-white p-4'></div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
