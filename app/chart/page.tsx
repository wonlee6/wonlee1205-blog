'use client'

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import Image from 'next/image'
import {TabPanel, TabView} from 'primereact/tabview'
import {EChartsOption} from 'echarts'
import NextUIButton from './nextUIButton'
import {ChartType} from '@/model/Chart.model'
import {ChartHelper} from '@/helper/ChartHelper'
import PreviewChart from './previewChart'
import ArrowDown from '@/public/images/arrow-down.svg'
import {useIntersectionObserver} from '@/hooks/useIntersectionObserver'
import MonacoEditor from './monacoEditor'

export default function Page() {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(editorRef, {threshold: 0.5})
  const isVisble = entry?.isIntersecting

  const [activeTabView, setActiveTabView] = useState(1)

  const [selectedMenu, setSelectedMenu] = useState<ChartType>(ChartType.Line)

  const [chartOption, setChartOption] = useState<EChartsOption | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined)

  const [editorContent, setEditorContent] = useState('')
  const [fetchJsonData, setFetchJsonData] = useState(null)

  const handleMenuClick = useCallback(
    (menu: ChartType) => {
      setSelectedMenu(menu)
      if (activeTabView === 2) {
        setActiveTabView(1)
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
    const findChartItem = findChartDataList.find(
      (_, index) => index === chartIndex
    )
    setActiveTabView(2)
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

  const handleThemeClick = useCallback(
    (selectedTheme: 'dark' | 'light' | 'default') => {
      setTheme(selectedTheme === 'default' ? undefined : selectedTheme)
    },
    []
  )

  const filteredChartImages = useMemo(() => {
    return ChartHelper.getChartList(selectedMenu)
  }, [selectedMenu])

  const echartTypeRef = useRef('')
  useEffect(() => {
    const fetchEChartsType = async () => {
      const response = await fetch(
        'https://cdn.jsdelivr.net/npm/echarts@5.4.3/types/dist/echarts.d.ts'
      )
      echartTypeRef.current = await response.text()
    }

    fetchEChartsType()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex w-full max-w-7xl mx-auto'>
        <div className='w-1/5 max-lg:hidden pt-4'>
          {ChartHelper.getChartMenuList().map((item) => (
            <NextUIButton
              key={item.name}
              color={selectedMenu === item.name ? 'primary' : 'secondary'}
              onClick={() => handleMenuClick(item.name)}
              className='w-full mb-4'>
              {item.name}
            </NextUIButton>
          ))}
        </div>
        <div className='pl-4 max-lg:w-full w-4/5 mx-auto'>
          <TabView
            className='pl-3'
            panelContainerClassName='dark:bg-black'
            activeIndex={activeTabView}
            onTabChange={(e) => setActiveTabView(e.index)}>
            <TabPanel header='Chart Menu' className='hidden max-lg:flex'>
              <div className='w-full flex flex-col items-center'>
                {ChartHelper.getChartMenuList().map((item) => (
                  <div key={item.name} className='w-1/2 flex justify-center'>
                    <NextUIButton
                      color={
                        selectedMenu === item.name ? 'primary' : 'secondary'
                      }
                      onClick={() => {
                        setActiveTabView(1)
                        setSelectedMenu(item.name)
                      }}
                      className='w-full mb-4'>
                      {item.name}
                    </NextUIButton>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel header='Chart List'>
              <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
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
            </TabPanel>
            <TabPanel header='Preview' contentClassName='h-full flex flex-col'>
              {chartOption ? (
                <>
                  <div className='mb-3 flex justify-center w-full'>
                    <NextUIButton
                      className='mr-2'
                      color='primary'
                      onClick={() => handleThemeClick('default')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Default
                    </NextUIButton>
                    <NextUIButton
                      color='primary'
                      className='mr-2 max-sm:w-12'
                      onClick={() => handleThemeClick('light')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Light
                    </NextUIButton>
                    <NextUIButton
                      className='max-sm:w-8'
                      color='primary'
                      onClick={() => handleThemeClick('dark')}
                      style={{minWidth: '5rem', width: '10rem'}}>
                      Dark
                    </NextUIButton>
                  </div>
                  <PreviewChart option={chartOption} theme={theme} />
                </>
              ) : (
                <p className='text-center'>
                  선택된 차트가 없거나 지원하지 않는 타입이에용.
                </p>
              )}
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div
        className='animate-bounce justify-center mt-4 mb-2 h-full hidden max-lg:flex'
        style={{
          visibility:
            activeTabView === 2 && editorContent && !isVisble
              ? 'visible'
              : 'hidden'
        }}>
        <Image src={ArrowDown} alt='arrow-down' width={60} height={60} />
      </div>
      {activeTabView === 2 && editorContent ? (
        <div
          ref={editorRef}
          className='flex max-lg:flex-col w-full mx-auto bg-zinc-300 p-4'
          style={{
            height: '55rem'
          }}>
          <div className='xl:w-1/2 lg:w-1/3 w-full h-full max-lg:h-1/2 border mr-2'>
            {editorContent ? (
              <MonacoEditor
                value={editorContent}
                fetchData={fetchJsonData}
                fetchType={echartTypeRef.current}
              />
            ) : null}
          </div>
          <div className='xl:w-1/2 lg:w-2/3 w-full h-full max-lg:h-1/2 max-lg:ml-0 ml-2 max-lg:mt-8'>
            <div
              id='chart'
              className='w-full h-full bg-white rounded-lg p-4 relative'></div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

interface ChartListItemModel {
  url: string
  title: string
  onChartClick: (title: number, url: string) => void
  index: number
}

const ChartListItem = ({
  url,
  title,
  onChartClick,
  index
}: ChartListItemModel) => {
  return (
    <div className='flex flex-col pb-2 rounded-sm'>
      <div className='relative p-2 hover:scale-110 duration-300 transition-all'>
        <Image
          className='cursor-pointer'
          src={url}
          alt={title}
          width={800}
          height={800}
          // unoptimized
          // objectFit='cover'
          onClick={() => onChartClick(index, url)}
        />
      </div>
      <p className='mt-2 p-1 text-center dark:text-teal-500'>{title}</p>
    </div>
  )
}
