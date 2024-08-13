import { ReactNode } from 'react'

import { Tab, Tabs } from '@nextui-org/react'

import StylesComponent from './styles'
import DragComponents from './components'

const EditorAttributes = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className='flex h-full w-1/5 border-l border-t border-default-300'>
        <div className='size-full border-r border-default-300 p-2'>
          <Tabs aria-label='Options' radius='none'>
            <Tab key='styles' title='Styles'>
              <StylesComponent />
            </Tab>

            <Tab key='Components' title='Components'>
              <DragComponents />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default EditorAttributes
