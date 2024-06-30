import ChartView from '@/components/chart/chart-viewer'
import {ChartType} from '@/model/Chart.model'

async function fetchChartType() {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/echarts@5.5.0/types/dist/echarts.d.ts'
    )
    return await response.text()
  } catch (e) {
    console.error(e)
    return ''
  }
}

export default async function SelectedChartPage({params}: {params: {slug: [ChartType, string]}}) {
  const getChartType = await fetchChartType()

  return <ChartView getChartType={getChartType} url={params.slug[1]} />
}
