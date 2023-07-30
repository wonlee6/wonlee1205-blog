import Script from 'next/script'

export default function ChartsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='w-3/4 xl:w-8/12 mx-auto pt-20'>
      {children}
      <Script
        src='https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js'
        async
      />
    </section>
  )
}
