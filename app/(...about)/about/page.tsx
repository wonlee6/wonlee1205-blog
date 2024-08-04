import AboutClient from '@/components/about'
import { Divider } from '@nextui-org/react'

export default function AboutPage() {
  return (
    <>
      <div className='flex pb-4 pt-8'>
        <h1 className='text-4xl font-bold'>About</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3>
            <b className='text-xl'>이상원</b>
          </h3>
          <span className='opacity-65'>updated at: Aug 4, 2024</span>
        </div>
        <div className='mb-12'>
          <p>Frontend Engineer</p>
          <span>Seoul, Korea 🇰🇷</span>
        </div>

        <h3>
          <b className='text-xl'>Profile</b>
        </h3>
        <Divider className='' />

        <ul>
          <li>- 생년월일: 1992.12.05</li>
          <li>- 이메일: wonlee6@gmail.com</li>
        </ul>

        <h3 className='mt-8'>
          <b className='text-xl'>Summary</b>
        </h3>
        <Divider className='' />
        <p>안녕하세요. 저는 3년차 프론트엔드 개발자 이상원 입니다.</p>
        <p>
          실무에서 React, Recoil, TypeScript를 중심으로 엔터프라이즈 비즈니스 솔루션 제품을 개발하고
          유지보수하고 있습니다.
        </p>
        <p>
          저는 지식을 쌓고 새로운 기술을 습득하는 것을 즐기며, 끊임없는 발전을 추구합니다. 최신 기술
          동향을 파악하고, 새로운 기술 스택을 학습하는 데 시간을 투자합니다.
        </p>

        <h3 className='mt-8'>
          <b className='text-xl'>Contact</b>
        </h3>
        <Divider className='' />
        <AboutClient />
      </div>
    </>
  )
}
