import { ReactNode } from 'react'

import { Tab, Tabs } from '@nextui-org/react'

import StylesTab from './styles-tab'
import ComponentsTab from './components-tab'
import LayersTab from './layers-tab'
import { m } from 'framer-motion'

export default function EditorSideBar({ children }: { children?: ReactNode }) {
  return (
    <>
      <m.aside
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring'
        }}
        layout
        className='flex h-full w-1/5 border-l border-t border-default-300'>
        <div className='size-full border-r border-default-300 p-2'>
          <Tabs aria-label='Options' radius='none'>
            <Tab key='styles' title='Styles'>
              <StylesTab />
            </Tab>

            <Tab key='Components' title='Components'>
              <ComponentsTab />
            </Tab>

            <Tab key='Layers' title='Layers'>
              <LayersTab />
            </Tab>
          </Tabs>
        </div>
      </m.aside>
    </>
  )
}
