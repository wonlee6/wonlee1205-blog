'use client'

import { useMemo } from 'react'

import { Tab, Tabs } from '@nextui-org/react'
import { m } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'

import ComponentsTab from './components-tab'
import LayersTab from './layers-tab'
import StorageTab from './storage-tab'
import StylesTab from './styles-tab'
import { useEditorStore } from '@/providers/user-store-provider'

// [BUG] - Accordion component is avoiding focus on inputs
// https://github.com/nextui-org/nextui/issues/3478

export default function EditorSideBar() {
  const [selectedElement, uploadImages] = useEditorStore(
    useShallow((state) => [state.selectedElement, state.uploadImages])
  )

  const selectedStyles = useMemo(() => selectedElement.styles, [selectedElement])
  const hasSelectedItem = selectedElement.id !== '' && selectedElement.group === 'Layout'

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
          destroyInactiveTabPanel={false}
          classNames={{ tabList: 'grid grid grid-cols-4 max-xl:flex-wrap max-xl:flex' }}>
          <Tab key='styles' title='Styles'>
            <StylesTab key={selectedElement.id} componentGroup={selectedElement.group}>
              <StylesTab.Typography selectedStyles={selectedStyles} />
              <StylesTab.Dimensions selectedStyles={selectedStyles} />
              <StylesTab.Decorations
                selectedStyles={selectedStyles}
                uploadImages={uploadImages}
                hasSelectedItem={hasSelectedItem}
              />
              <StylesTab.FlexBox
                selectedStyles={selectedStyles}
                componentGroup={selectedElement.group}
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
