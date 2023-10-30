'use client'

import {useMemo} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

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
import {CHAMP_SPLASH_IMG} from '@/lib/api-constant'
import {Navigation, Autoplay} from 'swiper/modules'

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
        img: `${CHAMP_SPLASH_IMG}${item.id}_0.jpg`,
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
        modules={[Navigation, Autoplay]}
        grabCursor={true}
        centeredSlides={true}
        navigation
        loop
        spaceBetween={50}
        slidesPerView={4}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}>
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
                <CardBody>
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
export default ChampRotation
