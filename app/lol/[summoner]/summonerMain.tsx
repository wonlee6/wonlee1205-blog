'use client'

export default function SummonerMain({children}: {children: React.ReactNode}) {
  return (
    <div className='max-w-7xl mx-auto h-full flex justify-center'>
      <div className='w-full border border-red-400'>{children}</div>
    </div>
  )
}
