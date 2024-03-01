import ChartComponent from '../../components/chart/chartComponent'

const fetchChartType = async () => {
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

export default async function ChartPage() {
  const chartType = await fetchChartType()
  return <ChartComponent echartsTypes={chartType} />
}
