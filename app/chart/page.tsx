'use client'

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import Image from 'next/image'
import {TabPanel, TabView} from 'primereact/tabview'
import {EChartsOption} from 'echarts'
import NextUIButton from './nextUIButton'
import {ChartType} from '@/model/Chart.model'
import {ChartHelper} from '@/helper/ChartHelper'
import PreviewChart from './previewChart'
import ArrowDown from '@/public/arrow-down.svg'
import {useIntersectionObserver} from '@/hooks/useIntersectionObserver'
import MonacoEditor from './monacoEditor'

export default function Page() {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(editorRef, {threshold: 0.5})
  const isVisble = entry?.isIntersecting

  const [activeTabView, setActiveTabView] = useState(0)

  const [selectedMenu, setSelectedMenu] = useState<ChartType>(ChartType.Line)

  const [chartOption, setChartOption] = useState<EChartsOption | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined)

  const [editorContent, setEditorContent] = useState('')
  const [fetchJsonData, setFetchJsonData] = useState(null)

  const handleMenuClick = useCallback(
    (menu: ChartType) => {
      setSelectedMenu(menu)
      if (activeTabView === 2) {
        setActiveTabView(0)
      }
      setChartOption(null)
      setTheme(undefined)
      setEditorContent('')
      setFetchJsonData(null)
    },
    [activeTabView]
  )

  const handleChartClick = (chartIndex: number, url: string) => {
    const findChartDataList = ChartHelper.getChartListData(selectedMenu)
    const findChartItem = findChartDataList.find(
      (_, index) => index === chartIndex
    )
    setActiveTabView(2)
    setChartOption(findChartItem ? findChartItem : null)

    const regUrl = url.split('images/')[1].replace(/\.(.*)/, '')

    if (regUrl === 'confidence-band' || regUrl === 'line-race') {
      fetch(`/data/${regUrl}.json`)
        .then((res) => res.json())
        .then((data) => setFetchJsonData(data))
    } else {
      setFetchJsonData(null)
    }

    fetch(`/data/${regUrl}.js`)
      .then((res) => res.text())
      .then((data) => setEditorContent(data))
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

  return (
    <div className='flex flex-col'>
      <div className='flex w-full max-w-7xl mx-auto'>
        <div className='w-1/5 max-lg:hidden'>
          {ChartHelper.getChartMenuList().map((item) => (
            <NextUIButton
              key={item.name}
              color={selectedMenu === item.name ? 'primary' : 'secondary'}
              onClick={() => handleMenuClick(item.name)}
              className='w-full mb-4'
              ghost>
              {item.name}
            </NextUIButton>
          ))}
        </div>
        <div className='w-4/5 mx-auto'>
          <TabView
            className='pl-3'
            panelContainerClassName='dark:bg-black'
            activeIndex={activeTabView}
            onTabChange={(e) => setActiveTabView(e.index)}>
            <TabPanel header='Chart Menu' headerClassName='hidden max-lg:block'>
              <div className='flex flex-col items-center'>
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
                      className='w-full mb-4'
                      ghost>
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
                  <div className='mb-3 flex justify-center'>
                    <NextUIButton
                      className='mr-2'
                      color='gradient'
                      onClick={() => handleThemeClick('default')}
                      ghost
                      bordered>
                      Default
                    </NextUIButton>
                    <NextUIButton
                      color='gradient'
                      className='mr-2'
                      bordered
                      ghost
                      onClick={() => handleThemeClick('light')}>
                      Light
                    </NextUIButton>
                    <NextUIButton
                      color='gradient'
                      bordered
                      ghost
                      onClick={() => handleThemeClick('dark')}>
                      Dark
                    </NextUIButton>
                  </div>
                  <PreviewChart option={chartOption} theme={theme} />
                </>
              ) : null}
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div
        className='animate-bounce flex justify-center mt-4 h-full'
        style={{
          visibility: activeTabView === 2 && !isVisble ? 'visible' : 'hidden'
        }}>
        <Image src={ArrowDown} alt='arrow-down' width={60} height={60} />
      </div>
      {activeTabView === 2 ? (
        <div
          ref={editorRef}
          className='flex flex-col w-full mx-auto bg-zinc-300 p-4'
          style={{
            visibility: isVisble ? 'visible' : 'hidden',
            height: '50rem'
          }}>
          <div className='flex max-lg:flex-col h-full'>
            <div className='xl:w-1/2 lg:w-1/3 w-full h-full border mr-2'>
              {editorContent ? (
                <MonacoEditor value={editorContent} fetchData={fetchJsonData} />
              ) : null}
            </div>
            <div className='xl:w-1/2 lg:w-2/3 w-full h-full ml-2 max-lg:mt-8'>
              <div
                id='chart'
                className='w-full h-full bg-white rounded-lg p-4 relative'></div>
            </div>
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
      <p className='p-1 text-center dark:text-teal-500'>{title}</p>
    </div>
  )
}