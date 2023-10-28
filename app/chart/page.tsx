import ChartComponent from '../../components/chart/chartComponent'

export default async function ChartPage() {
  let result = ''
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/echarts@5.4.3/types/dist/echarts.d.ts'
    )
    result = await response.text()
  } catch (error) {
    console.log(error)
  }
  return <ChartComponent echartsTypes={result} />
}
