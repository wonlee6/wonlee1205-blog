'use client'

import React, {useCallback, useMemo, useRef, useState} from 'react'
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
      if (activeTabView === 1) {
        setActiveTabView(0)
      }
      setChartOption(null)
      setTheme(undefined)
      setEditorContent('')
    },
    [activeTabView]
  )

  const handleChartClick = useCallback(
    (chartIndex: number, url: string) => {
      const findChartDataList = ChartHelper.getChartListData(selectedMenu)
      const findChartItem = findChartDataList.find(
        (_, index) => index === chartIndex
      )
      setActiveTabView(1)
      setChartOption(findChartItem ? findChartItem : null)

      const regUrl = url.split('images/')[1].replace(/\.(.*)/, '')
      fetch(`/data/${regUrl}.js`)
        .then((res) => res.text())
        .then((data) => setEditorContent(data))

      if (regUrl === 'confidence-band') {
        fetch(`/data/${regUrl}.json`)
          .then((res) => res.json())
          .then((data) => setFetchJsonData(data))
      }
    },
    [selectedMenu]
  )

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
      <div className='flex'>
        <div className='w-1/5'>
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
        <div className='w-4/5'>
          <TabView
            className='pl-3'
            panelContainerClassName='dark:bg-black'
            activeIndex={activeTabView}
            onTabChange={(e) => setActiveTabView(e.index)}>
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
          {activeTabView === 1 && (
            <div
              className='animate-bounce flex justify-center pr-40'
              style={{
                visibility: isVisble ? 'hidden' : 'visible'
              }}>
              <Image src={ArrowDown} alt='arrow-down' width={60} height={60} />
            </div>
          )}
        </div>
      </div>
      {activeTabView === 1 ? (
        <div
          ref={editorRef}
          className='flex'
          style={{
            visibility: isVisble ? 'visible' : 'hidden',
            height: '700px'
          }}>
          <div className='w-1/2 h-full border'>
            {editorContent ? (
              <MonacoEditor value={editorContent} fetchData={fetchJsonData} />
            ) : null}
          </div>
          <div className='w-1/2 h-full'>
            <div id='chart' className='w-full h-full'></div>
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
