'use client'

import task1 from '@/public/images/task1.png'
import task2 from '@/public/images/task2.png'
import task3 from '@/public/images/task3.png'
import task4 from '@/public/images/task4.png'
import task5 from '@/public/images/task5.png'
import { Image } from '@nextui-org/react'

export default function WorkIndex() {
  return (
    <div className='my-8 mb-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Workflow Management</h1>
      <p className='text-lg'>간단한 설명을 위한 예시 화면입니다.</p>

      <div className='flex justify-center'>
        <Image src={task5.src} alt='old' loading='lazy' isBlurred />
      </div>
      <p className='my-4 text-lg'>
        위와 같이 window에 설치하여 사용하는 application을 <b>web</b>으로 컨버팅 작업
        진행하였습니다.
      </p>

      <Image src={task1.src} alt='task1' loading='lazy' isBlurred />
      <p className='my-4 text-lg'>
        화면 왼쪽 도형(Activities, events, gateways, etc)을 drap and drop을 통해 오른쪽 캔버스로
        이동시켜 프로세스를 만든 화면입니다.
      </p>
      <Image src={task2.src} alt='task2' loading='lazy' isBlurred />
      <p className='my-4 text-lg'>
        각 도형들은 여러 개의 속성(옵션)들을 가지고 있습니다. (도형 이외에도 가지고 있습니다)
      </p>
      <Image src={task3.src} alt='task3' loading='lazy' isBlurred />
      <p className='my-4 text-lg'>
        선택한 <b>선</b>에 대한 속성(옵션) 정의 화면
      </p>
      <Image src={task4.src} alt='task4' loading='lazy' isBlurred />
      <p className='my-4 text-lg'>
        선택한 <b>Activity</b>에 대한 속성(옵션) 정의 화면
      </p>
      <p>글보단 그림과 함께 확인하면 더 좋을 것 같아 간단하게 만들었습니다.</p>
      <p>전체 기능 중 중요 부분만 작성한 점 참고해주시면 감사하겠습니다.</p>
    </div>
  )
}
