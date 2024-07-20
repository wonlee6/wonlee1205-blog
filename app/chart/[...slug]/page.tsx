import ChartView from '@/components/chart/chart-viewer'
import {ChartType} from '@/model/Chart.model'
import {Metadata} from 'next'

export async function generateMetadata({
  params
}: {
  params: {slug: [ChartType, string]}
}): Promise<Metadata> {
  const chartType = params.slug[0]
  const chartName = params.slug[1]

  const url = `https://wonlee1205-blog.vercel.app/chart/${params.slug[1]}`

  const title = `${chartType} Chart - ${chartName} | Interactive Editor`
  const description = `Explore and edit a ${chartType} chart with our interactive editor. This example shows a ${chartName} chart using Echarts in a React application.`

  return {
    title,
    description,
    authors: [{name: 'sang won', url}],
    creator: 'sang won',
    keywords: [`${chartType} chart`, `${chartName}`, 'Echarts', 'React', 'Chart Editor'],
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description,
      title,
      url
    },
    metadataBase: new URL(url)
  }
}

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
