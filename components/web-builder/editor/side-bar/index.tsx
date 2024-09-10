'use client'

import { useEffect, useState } from 'react'

import { m } from 'framer-motion'
import { DatabaseIcon, LayersIcon, PackagePlusIcon, PaintbrushIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import ComponentsTab from './components-tab'
import LayersTab from './layers-tab'
import StorageTab from './storage-tab'
import StylesTab from './styles-tab'
import { getStorageUrl } from '@/lib/session'
import { StorageSchemaModel } from '@/model/web-builder'
import { useEditorStore } from '@/providers/user-store-provider'

export type SideTab = 'styles' | 'component' | 'layer' | 'storage'

const ComponentList = {
  styles: <StylesTab />,
  component: <ComponentsTab />,
  layer: <LayersTab />,
  storage: <StorageTab />
}

export default function EditorSideBar() {
  const [onUploadImage] = useEditorStore(useShallow((state) => [state.onUploadImage]))

  const [selectedTab, setSelectedTab] = useState<SideTab>('styles')

  const handleSelectTab = (tab: SideTab) => {
    setSelectedTab(tab)
  }

  const handleSelectTabByKeyboard = (e: React.KeyboardEvent<HTMLDivElement>, tab: SideTab) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setSelectedTab(tab)
    }
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const fetchImageList = fetch('/api/web-builder/storage', {
          method: 'GET'
        })
        const fetchUrl = getStorageUrl()
        const response = await Promise.allSettled([fetchImageList, fetchUrl])

        if (response[0].status === 'fulfilled' && response[1].status === 'fulfilled') {
          const data: StorageSchemaModel[] = await response[0].value.json()
          const filterEmptyData = data
            .filter((i) => i.name !== '.emptyFolderPlaceholder')
            .map((i) => ({
              path: i.name
            }))
          onUploadImage(filterEmptyData, response[1].value)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <m.aside
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring'
        }}
        layout
        className='sticky right-0 top-0 h-auto w-[370px] text-clip border-t'>
        <nav className='absolute right-0 top-0 z-[1] flex h-full w-[75px] flex-col items-center justify-normal gap-4 overflow-auto border-l border-default-300 bg-[#f6f7f9] pb-6 pt-2'>
          <div
            className='group flex cursor-pointer flex-col items-center justify-center font-medium'
            onClick={() => handleSelectTab('styles')}
            onKeyDown={(e) => handleSelectTabByKeyboard(e, 'styles')}
            tabIndex={0}
            role='button'
            aria-label='Styles Tab'>
            <div className='rounded-lg p-2 group-hover:bg-default-200'>
              <PaintbrushIcon className='text-default-600' />
            </div>
            <span className='text-xs text-foreground-400'>Styles</span>
          </div>

          <div
            className='group flex cursor-pointer flex-col items-center justify-center font-medium'
            onClick={() => handleSelectTab('component')}
            onKeyDown={(e) => handleSelectTabByKeyboard(e, 'component')}
            tabIndex={0}
            role='button'
            aria-label='Component Tab'>
            <div className='rounded-lg p-2 group-hover:bg-default-200'>
              <PackagePlusIcon className='text-default-600' />
            </div>
            <span className='text-xs text-foreground-400'>Component</span>
          </div>

          <div
            className='group flex cursor-pointer flex-col items-center justify-center font-medium'
            onClick={() => handleSelectTab('layer')}
            onKeyDown={(e) => handleSelectTabByKeyboard(e, 'layer')}
            tabIndex={0}
            role='button'
            aria-label='Layer Tab'>
            <div className='rounded-lg p-2 group-hover:bg-default-200'>
              <LayersIcon className='text-default-600' />
            </div>
            <span className='text-xs text-foreground-400'>Layer</span>
          </div>

          <div
            className='group flex cursor-pointer flex-col items-center justify-center font-medium'
            onClick={() => handleSelectTab('storage')}
            onKeyDown={(e) => handleSelectTabByKeyboard(e, 'storage')}
            tabIndex={0}
            role='button'
            aria-label='Storage Tab'>
            <div className='rounded-lg p-2 group-hover:bg-default-200'>
              <DatabaseIcon className='text-default-600' />
            </div>
            <span className='text-xs text-foreground-400'>Storage</span>
          </div>
        </nav>

        <div className='grid h-full w-[295px] grid-cols-1 grid-rows-1 border-l bg-[#f6f7f9] py-1'>
          <div className='flex-1 overflow-y-auto px-1 pb-1 scrollbar-hide'>
            {ComponentList[selectedTab]}
          </div>
        </div>
      </m.aside>
    </>
  )
}
