'use client'

import React, {useEffect, useState} from 'react'
import {transpile} from 'typescript'
import Editor, {useMonaco} from '@monaco-editor/react'
import {debounce} from 'lodash'

type Props = {
  value: string
  fetchData: any
}

export default function MonacoEditor({value, fetchData}: Props) {
  const monaco = useMonaco()

  const [editorContent, setEditorContent] = useState(value)

  const handleMount = () => {
    const regValue = value.trim().replace(/export\s+\{\s*\}\s*;?$/g, '')
    setEditorContent(regValue)

    let code = `
const chartDom = document.getElementById('chart');
let myChart = echarts.init(chartDom, null, {renderer: 'svg'});

window.addEventListener('resize', function() {
  myChart.resize();
})

let option;

${regValue}
    `
    if (fetchData) {
      code += `
run(${JSON.stringify(fetchData)})
    `
    }
    code += `
option && myChart.setOption(option, true, true);
        `

    try {
      const result = transpile(code)
      Function(result)()
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = debounce((val: string | undefined, ev: any) => {
    if (typeof val === 'undefined') return

    setEditorContent(val)

    let code = `
const chartDom = document.getElementById('chart');
let myChart = echarts.getInstanceByDom(chartDom);
let option;

${val}
    `
    if (fetchData) {
      code += `
run(${JSON.stringify(fetchData)})
    `
    }
    code += `
option && myChart.setOption(option, true, true);
        `

    try {
      const result = transpile(code)
      Function(result)()
    } catch (error) {
      console.error(error)
    }
  }, 300)

  const loadTypes = async () => {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/echarts@5.4.3/types/dist/echarts.d.ts'
    )
    const code = await response.text()
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
    typescriptDefaults.addExtraLib(
      code,
      'file:///node_modules/@types/echarts/echarts.d.ts'
    )
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
    return
  }

  useEffect(() => {
    if (monaco) {
      loadTypes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco])

  return (
    <Editor
      width={'100%'}
      height={'100%'}
      language='typescript'
      value={editorContent}
      options={{
        minimap: {
          enabled: false
        },
        fontSize: 13,
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
        wordWrap: 'off',
        fixedOverflowWidgets: true
      }}
      onMount={handleMount}
      onChange={handleChange}
    />
  )
}
