import { Divider } from '@nextui-org/react'

import AboutClient from '@/components/about'

export default function AboutPage() {
  return (
    <>
      <div className='flex pb-4 pt-8'>
        <h1 className='text-4xl font-bold'>About</h1>
      </div>
      <div className='flex flex-col'>
        <div className='my-4 flex items-center justify-between'>
          <h3>
            <b className='text-xl'>이상원</b>
          </h3>
          <span className='opacity-65'>updated at: Aug 4, 2024</span>
        </div>
        <div className='mb-8'>
          <p>Frontend Engineer</p>
          <span>Seoul, Korea 🇰🇷</span>

          <p className='mt-4'>안녕하세요. 저는 프론트엔드 개발자입니다.</p>
          <p>공부한 부분을 기억하고 싶거나 공유하기 위한 블로그입니다.</p>
        </div>

        <h3>
          <b className='text-xl'>Profile</b>
        </h3>
        <Divider className='my-3' />

        <ul>
          <li>- 생년월일: 1992.12.05</li>
          <li>- 이메일: wonlee6@gmail.com</li>
        </ul>

        <h3 className='mt-8'>
          <b className='text-xl'>Contact</b>
        </h3>
        <Divider className='my-3' />
        <AboutClient />
      </div>
    </>
  )
}
