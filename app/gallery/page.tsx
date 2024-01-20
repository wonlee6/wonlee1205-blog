import cat1 from '@/public/images/gallery/cat1.jpeg'
import cat2 from '@/public/images/gallery/cat2.jpeg'
import cat3 from '@/public/images/gallery/cat3.jpeg'
import cat4 from '@/public/images/gallery/cat4.jpeg'
import cat5 from '@/public/images/gallery/cat5.jpeg'
import cat6 from '@/public/images/gallery/cat6.jpeg'
import cat7 from '@/public/images/gallery/cat7.jpeg'
import cat8 from '@/public/images/gallery/cat8.jpeg'
import cat9 from '@/public/images/gallery/cat9.jpeg'
import cat10 from '@/public/images/gallery/cat10.jpeg'
import cat11 from '@/public/images/gallery/cat11.jpeg'
import cat12 from '@/public/images/gallery/cat12.jpeg'
import cat13 from '@/public/images/gallery/cat13.jpeg'
import cat14 from '@/public/images/gallery/cat14.jpeg'
import cat15 from '@/public/images/gallery/cat15.jpeg'
import cat16 from '@/public/images/gallery/cat16.jpeg'
import cat17 from '@/public/images/gallery/cat17.jpeg'
import cat18 from '@/public/images/gallery/cat18.jpeg'
import cat19 from '@/public/images/gallery/cat19.jpeg'
import cat20 from '@/public/images/gallery/cat20.jpeg'
import cat21 from '@/public/images/gallery/cat21.jpeg'
import cat22 from '@/public/images/gallery/cat22.jpeg'
import SwiperComponent from './swiperComponent'

export default function Gallery() {
  const imageList = [
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    cat7,
    cat8,
    cat9,
    cat10,
    cat11,
    cat12,
    cat13,
    cat14,
    cat15,
    cat16,
    cat17,
    cat18,
    cat19,
    cat20,
    cat21,
    cat22
  ].map((item, index) => {
    return {
      idx: index + 1,
      img: item
    }
  })

  return (
    <div className='p-4 h-full'>
      <SwiperComponent imageList={imageList} />
    </div>
  )
}
