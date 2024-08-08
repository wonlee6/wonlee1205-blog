import ChartClient from '@/components/chart'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creating a React Chart Component Using Echarts',
  description: 'Using the Monaco Editor and Echarts Library in React',
  authors: {
    url: 'https://wonlee1205-blog.vercel.app/',
    name: 'sang won'
  },
  keywords: ['React', 'Echarts', 'Monaco Editor', 'Chart Component'],
  openGraph: {
    type: 'website',
    countryName: 'Korea',
    locale: 'ko',
    url: 'https://wonlee1205-blog.vercel.app/chart',
    description: 'Using the Monaco Editor and Echarts Library in React',
    title: 'Creating a React Chart Component Using Echarts'
  }
}

export default function ChartPage() {
  return <ChartClient />
}
