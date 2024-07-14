import {Divider} from '@nextui-org/react'

export default function AboutPage() {
  return (
    <>
      <div className='flex border-b border-default-300 pb-4 pt-8'>
        <h1 className='text-4xl font-bold'>About</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <b className='text-xl'>이상원</b>
          <span className='opacity-65'>updated at: July 14, 2024</span>
        </div>
        <div>
          <p>Frontend Engineer</p>
          <span>Seoul, Korea 🇰🇷</span>
        </div>
      </div>

      <div></div>
      <Divider />
    </>
  )
}
