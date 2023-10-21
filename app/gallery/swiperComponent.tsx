'use client'

import React from 'react'
import Image, {StaticImageData} from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow
} from 'swiper/modules'

interface Props {
  imageList: {idx: number; img: StaticImageData}[]
}

export default function SwiperComponent({imageList}: Props) {
  return (
    <Swiper
      className='h-full gallery-swiper'
      effect={'coverflow'}
      modules={[Navigation, Scrollbar, A11y, Autoplay, EffectCoverflow]}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      navigation
      loop
      // slidesPerView='auto'
      // autoplay={{
      //   delay: 2400,
      //   disableOnInteraction: false
      // }}
      // spaceBetween={50}
      // scrollbar={{draggable: true}}
      // pagination={{clickable: true}}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {imageList.map((item) => (
        <SwiperSlide key={item.idx}>
          <Image src={item.img} alt='photo' width={500} height={700} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
