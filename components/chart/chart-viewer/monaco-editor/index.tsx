'use client'

import React, {useEffect, useRef, useState} from 'react'
import Editor, {useMonaco} from '@monaco-editor/react'

type Props = {
  value: string
  fetchData: any
  fetchType: string
}

export default function MonacoEditor({value, fetchData, fetchType}: Props) {
  const monaco = useMonaco()
  const editorContent = useRef(value.trim().replace(/export\s+\{\s*\}\s*;?$/g, ''))

  const [isLoadType, setIsLoadType] = useState(false)

  const handleMount = async () => {
    try {
      const getCode = await handleTranspileCode()
      let code = `
      const chartDom = document.getElementById('chart');
      let myChart = echarts.init(chartDom, null, {renderer: 'svg'});
      window.addEventListener('resize', function() {
        myChart.resize();
      })
      let option;
      ${getCode}
          `
      if (fetchData) {
        code += `
      run(${JSON.stringify(fetchData)})
          `
      }
      code += `
      option && myChart.setOption(option, true, true);
              `
      Function(code)()
    } catch (error) {
      console.error('Mount error', error)
    }
  }

  const handleTranspileCode = async () => {
    try {
      const worker = await monaco.languages.typescript.getTypeScriptWorker()
      const uri = monaco.Uri.parse('complexchart')
      const client = await worker(uri)
      const output = await client.getEmitOutput(uri.toString())
      return output.outputFiles[0].text
    } catch (e) {
      console.error('transpile error', e)
    }
  }

  const handleChange = async (val: string | undefined, ev: any) => {
    if (typeof val === 'undefined') return

    editorContent.current = val

    try {
      const getCode = await handleTranspileCode()
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
      option && myChart.setOption(option, true, true);
              `
      Function(code)()
    } catch (error) {
      console.error('change event error', error)
    }
  }

  const loadTypes = async () => {
    const code = fetchType
    const tsLang = monaco.languages.typescript
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
    typescriptDefaults.addExtraLib(code, 'file:///node_modules/@types/echarts/echarts.d.ts')
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
        const d3: any;
        const myChart: echarts.ECharts;
        let option: echarts.EChartsOption;

        const echarts: typeof echarts;
    }
    `
    )
    setIsLoadType(true)
  }

  useEffect(() => {
    if (monaco) {
      loadTypes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco])

  useEffect(() => {
    if (isLoadType) {
      handleMount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadType])

  return (
    <Editor
      width={'100%'}
      height={'100%'}
      language='typescript'
      value={editorContent.current}
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
      // onMount={handleMount}
      onChange={handleChange}
      path='complexchart'
    />
  )
}
