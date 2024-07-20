'use client'

import React, {useCallback, useEffect, useRef, useState} from 'react'

import * as prettier from 'prettier/standalone'
import * as tsPrinter from 'prettier/parser-typescript'
import * as prettierPluginEstree from 'prettier/plugins/estree'

import MonacoEditor from './monaco-editor'
import Editor from '@monaco-editor/react'
import {
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button
} from '@nextui-org/react'

type props = {
  url: string
  getChartType: string
}

export default function ChartView({url, getChartType}: props) {
  const chartRef = useRef(null)

  const [value, setValue] = useState('')
  const [jsonData, setJsonData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        if (url === 'confidence-band' || url === 'line-race') {
          const responseJsonData = await fetch(`/data/${url}.json`)
          const jsonData = await responseJsonData.json()
          setJsonData(jsonData)
        }

        const responseChartData = await fetch(`/data/${url}.ts`, {method: 'get'})
        const chartData = await responseChartData.text()

        setValue(chartData)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {isOpen, onOpen, onClose} = useDisclosure()

  const chartOption = useRef('')
  const handleOpenModal = useCallback(async () => {
    const getChartOption = (window as any).echarts.getInstanceByDom(chartRef.current!).getOption()
    chartOption.current = await prettier.format(`option = ${JSON.stringify(getChartOption)}`, {
      parser: 'typescript',
      tabWidth: 2,
      plugins: [tsPrinter, prettierPluginEstree]
    })

    onOpen()
  }, [onOpen])

  if (loading) {
    return (
      <div className='flex size-full items-center justify-center'>
        <Spinner size='lg' label='Loading...' />
      </div>
    )
  }

  return (
    <>
      <div className='flex size-full flex-col rounded bg-default-200'>
        <div className='flex pt-2'>
          <div className='flex w-1/2 justify-center'>
            <Button onClick={handleOpenModal} color='primary' variant='shadow'>
              Open All Options
            </Button>
          </div>
        </div>
        <div className='flex size-full'>
          <div className='h-full w-1/2 p-2 max-md:h-1/2 max-md:w-full'>
            <MonacoEditor value={value} fetchData={jsonData} fetchType={getChartType} />
          </div>
          <div className='h-full w-1/2 p-2 max-md:h-1/2 max-md:w-full'>
            <div
              ref={chartRef}
              id='chart'
              className='relative size-full rounded-sm bg-white p-4'></div>
          </div>
        </div>
      </div>
      <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} classNames={{base: 'h-[90vh]'}}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>All Chart Options</ModalHeader>
              <ModalBody>
                <Editor
                  key='option-modal'
                  className='size-full rounded border border-default-200'
                  language='javascript'
                  value={chartOption.current}
                  options={{
                    minimap: {
                      enabled: true
                    },
                    fontSize: 14,
                    scrollbar: {
                      horizontal: 'auto',
                      vertical: 'auto'
                    },
                    readOnly: true,
                    formatOnPaste: true,
                    formatOnType: true,
                    lineNumbers: 'on',
                    automaticLayout: true,
                    autoIndent: 'brackets',
                    wordWrap: 'on'
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
