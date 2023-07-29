'use client'

import React, {useCallback, useMemo, useState} from 'react'
import Image from 'next/image'
import {TabPanel, TabView} from 'primereact/tabview'
import {EChartsOption} from 'echarts'
import NextUIButton from './nextUIButton'
import {ChartType} from '@/model/Chart.model'
import {ChartHelper} from '@/helper/ChartHelper'
import PreviewChart from './previewChart'

export default function Page() {
  const [activeTabView, setActiveTabView] = useState(0)

  const [selectedChartType, setSelectedChartType] = useState<ChartType>(
    ChartType.Line
  )

  const handleMenuClick = useCallback(
    (selectedMenu: ChartType) => {
      setSelectedChartType(selectedMenu)
      if (activeTabView === 1) {
        setActiveTabView(0)
      }
    },
    [activeTabView]
  )

  const filteredChartImages = useMemo(() => {
    return ChartHelper.getChartList(selectedChartType)
  }, [selectedChartType])

  const [chartOption, setChartOption] = useState<EChartsOption | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined)

  const handleChartClick = useCallback(
    (chartIndex: number) => {
      const findChartDataList = ChartHelper.getChartListData(selectedChartType)
      const findChartItem = findChartDataList.find(
        (_, index) => index === chartIndex
      )
      setActiveTabView(1)
      setChartOption(findChartItem ? findChartItem : null)
    },
    [selectedChartType]
  )

  const handleThemeClick = (selectedTheme: 'dark' | 'light' | 'default') => {
    setTheme(selectedTheme === 'default' ? undefined : selectedTheme)
  }

  return (
    <div className='flex'>
      <div className='w-1/5'>
        {ChartHelper.getChartMenuList().map((item) => (
          <NextUIButton
            key={item.name}
            color={selectedChartType === item.name ? 'primary' : 'secondary'}
            onClick={() => handleMenuClick(item.name)}
            className='w-full mb-4'
            ghost>
            {item.name}
          </NextUIButton>
        ))}
      </div>
      <div className='w-4/5'>
        <TabView
          activeIndex={activeTabView}
          onTabChange={(e) => setActiveTabView(e.index)}>
          <TabPanel header='Chart List'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-2'>
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
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

interface ChartListItemModel {
  url: string
  title: string
  onChartClick: (title: number) => void
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
          onClick={() => onChartClick(index)}
        />
      </div>
      <p className='p-1 text-center'>{title}</p>
    </div>
  )
}
