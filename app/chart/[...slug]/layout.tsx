import Script from 'next/script'

export default function ChartsLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className='size-full p-4'>
      {children}
      <Script src='https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js' async />
    </div>
  )
}
