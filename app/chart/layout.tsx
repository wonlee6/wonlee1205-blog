import {Metadata} from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Echarts 이용해서 React Chart Component 만들기',
  description: 'React에서 Monaco Editor Echarts 라이브러리 사용'
}

export default function ChartsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='mt-4'>
      {children}
      <Script src='https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js' async />
    </section>
  )
}
