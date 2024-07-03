'use client'

import React, {useRef, useState} from 'react'
import Editor, {Monaco} from '@monaco-editor/react'
import {Runner} from 'react-runner'
import {useDebounce} from '@/hooks/useDebounce'

type Props = {
  value: string
  fetchData: any
  fetchType: string
}

export default function MonacoEditor({value, fetchData, fetchType}: Props) {
  const monacoInstance = useRef<Monaco | null>(null)
  const editorContent = useRef(value.trim().replace(/export\s+\{\s*\}\s*;?$/g, ''))

  const [loading, setLoading] = useState(true)

  const [transpiledCode, setTranspiledCode] = useState<string | null>(null)

  const handleMount = async (editor: any, monaco: Monaco) => {
    monacoInstance.current = monaco

    try {
      await loadTypes(fetchType)

      const getCode = await handleTranspileCode()
      if (typeof getCode === 'undefined') return

      let code = `
      const chartDom = document.getElementById('chart');
      let myChart = echarts.init(chartDom, null, {renderer: 'svg'});
      window.addEventListener('resize', function() {
        myChart.resize();
      }, { passive: true });
      
      let option;
      ${getCode}
          `
      if (fetchData) {
        code += `
      run(${JSON.stringify(fetchData)})
          `
      }
      code += `
      if (option && typeof option === "object") {
        myChart.setOption(option, true, true);
      }
      `

      setTranspiledCode(code)
      setLoading(false)
    } catch (error) {
      console.error('Mount error', error)
    }
  }

  const handleChange = useDebounce(async (val: string | undefined) => {
    if (typeof val === 'undefined') return

    try {
      const getCode = await handleTranspileCode()
      if (typeof getCode === 'undefined') return

      let code = `
      const chartDom = document.getElementById('chart');
      let myChart = echarts.getInstanceByDom(chartDom);
      let option;
      ${getCode}
          `
      if (fetchData) {
        code += `
      run(${JSON.stringify(fetchData)})
          `
      }
      code += `
      if (option && typeof option === "object") {
        myChart.setOption(option, true, true);
      }
      `

      setTranspiledCode(code)
    } catch (error) {
      console.error('change event error', error)
    }
  }, 250)

  const handleTranspileCode = async () => {
    try {
      if (!monacoInstance.current) return

      const worker = await monacoInstance.current.languages.typescript.getTypeScriptWorker()
      const uri = monacoInstance.current.Uri.parse('sample-chart')
      const client = await worker(uri)
      const output = await client.getEmitOutput(uri.toString())
      return output.outputFiles[0].text
    } catch (e) {
      console.error('transpile error', e)
    }
  }

  const loadTypes = async (fetchType: string) => {
    if (!monacoInstance.current) return

    const tsLang = monacoInstance.current.languages.typescript
    const typescriptDefaults = tsLang.typescriptDefaults
    // validation settings
    typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    })
    // compiler options
    typescriptDefaults.setCompilerOptions({
      target: tsLang.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      noResolve: false
    })
    typescriptDefaults.addExtraLib(fetchType, 'file:///node_modules/@types/echarts/echarts.d.ts')
    typescriptDefaults.addExtraLib(
      `
    import * as echarts from 'echarts';
    // Export for UMD module.
    export as namespace echarts
    export = echarts;`,
      'file:///node_modules/@types/echarts/index.d.ts'
    )
    typescriptDefaults.addExtraLib(
      `import * as echarts from 'echarts';
    // Declare to global namespace.
    declare global {
        const app: {
            configParameters: {
                [key: string]: {
                    options: Record<string, string> | string[]
                } | {
                    min?: number
                    max?: number
                }
            },
            config: {
                onChange: () => void
                [key: string]: string | number | Function
            },
            onresize: () => void,
            [key: string]: any
        };

        const ecStat: any;
        const myChart: echarts.ECharts;
        let option: echarts.EChartsOption;

        const echarts: typeof echarts;
    }
    `
    )
  }

  return (
    <>
      <Editor
        width={'100%'}
        height={'100%'}
        language='typescript'
        value={editorContent.current}
        loading={loading}
        options={{
          minimap: {
            enabled: false
          },
          fontSize: 14,
          scrollbar: {
            horizontal: 'auto',
            vertical: 'auto'
          },
          readOnly: false,
          formatOnPaste: true,
          formatOnType: true,
          lineNumbers: 'on',
          automaticLayout: true,
          autoIndent: 'brackets',
          wordWrap: 'off'
          // fixedOverflowWidgets: true
        }}
        onMount={handleMount}
        onChange={handleChange}
        path='sample-chart'
      />
      {transpiledCode && <Runner code={transpiledCode} />}
    </>
  )
}
