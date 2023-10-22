'use client'

import React, {memo, useMemo} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow
} from 'swiper/modules'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Tooltip
} from '@nextui-org/react'
import {ChampInfo} from '@/model/LOL.model'

interface Props {
  filteredLotationList: ChampInfo[]
}

function ChampRotation({filteredLotationList}: Props) {
  const imgList: {
    img: string
    name: string
    key: string
    title: string
    blurb: string
  }[] = useMemo(() => {
    return filteredLotationList.map((item) => {
      return {
        img: `${process.env.NEXT_PUBLIC_RIOT_GAMES_CHAMPION_SPLASH_IMG}${item.id}_0.jpg`,
        name: item.name,
        key: item.key,
        title: item.title,
        blurb: item.blurb
      }
    })
  }, [filteredLotationList])

  return (
    <div className='w-full p-4 pt-16'>
      <Swiper
        className='h-full'
        modules={[Navigation, Scrollbar, A11y, Autoplay, EffectCoverflow]}
        grabCursor={true}
        centeredSlides={true}
        navigation
        loop
        spaceBetween={50}
        scrollbar={{draggable: true}}
        slidesPerView={4}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        // pagination={{clickable: true}}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {imgList.map((item) => (
          <SwiperSlide key={item.key} className='h-full'>
            <Tooltip showArrow content='이번주 로테이션 챔피언'>
              <Card
                isPressable
                className='max-w-[400px] h-full bg-default-100/25 hover:bg-default-100 dark:bg-default-100/25 dark:hover:bg-default-200'>
                <CardHeader className='h-1/6'>
                  <div className='flex flex-col w-full'>
                    <h4 className='text-xl'>{item.name}</h4>
                    <span className='text-small text-default-400'>
                      {item.title}
                    </span>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className=''>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={500}
                    height={700}
                    isZoomed
                  />
                </CardBody>
                <Divider />
                <CardFooter className='h-2/5' title={item.blurb}>
                  {item.blurb}
                </CardFooter>
              </Card>
            </Tooltip>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default memo(ChampRotation)
