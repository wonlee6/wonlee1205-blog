export default function SummonerLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='max-w-7xl mx-auto h-full flex justify-center'>
      <div className='w-full'>{children}</div>
    </div>
  )
}
