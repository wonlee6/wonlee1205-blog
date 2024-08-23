'use client'

import { Tab, Tabs } from '@nextui-org/react'

import StylesTab from './styles-tab'
import ComponentsTab from './components-tab'
import LayersTab from './layers-tab'
import { m } from 'framer-motion'
import { useEditorStore } from '@/providers/user-store-provider'
import { useShallow } from 'zustand/react/shallow'
import { useEffect, useMemo } from 'react'
import StorageTab from './storage-tab'

// [BUG] - Accordion component is avoiding focus on inputs
// https://github.com/nextui-org/nextui/issues/3478

export default function EditorSideBar() {
  const [selectedElement] = useEditorStore(useShallow((state) => [state.selectedElement]))

  const selectedStyles = useMemo(() => selectedElement.styles, [selectedElement])

  return (
    <>
      <m.aside
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring'
        }}
        layout
        className='h-full w-3/12 overflow-auto border-l border-t border-default-300 p-2'>
        <Tabs
          aria-label='Options'
          radius='none'
          classNames={{ tabList: 'grid grid grid-cols-4 max-xl:flex-wrap max-xl:flex' }}>
          <Tab key='styles' title='Styles'>
            <StylesTab key={selectedElement.id} componentType={selectedElement.type}>
              <StylesTab.Typography selectedStyles={selectedStyles} />
              <StylesTab.Dimensions selectedStyles={selectedStyles} />
              <StylesTab.Decorations selectedStyles={selectedStyles} />
              <StylesTab.FlexBox
                selectedStyles={selectedStyles}
                componentType={selectedElement.type}
              />
              <StylesTab.CustomBox customStyles={selectedElement.customStyles} />
            </StylesTab>
          </Tab>

          <Tab key='Components' title='Components'>
            <ComponentsTab />
          </Tab>

          <Tab key='Layers' title='Layers'>
            <LayersTab />
          </Tab>

          <Tab key='Storage' title='Storage'>
            <StorageTab />
          </Tab>
        </Tabs>
      </m.aside>
    </>
  )
}
