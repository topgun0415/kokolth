import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MenuCard } from '../atoms/MenuCard';

interface SpringCarouselProps {}

const menuItems = [
  {
    imageUrl: '/images/menu1.jpg',
    nameJa: '高齢出産に関してお悩みの方',
  },
  {
    imageUrl: '/images/menu2.jpg',
    nameJa: '妊活中でお気持ちを吐き出したい方',
  },
  {
    imageUrl: '/images/menu3.jpg',
    nameJa: '妊娠中でお悩みがある方',
  },
  {
    imageUrl: '/images/menu4.jpg',
    nameJa: '高齢で育児をされている方',
  },
  {
    imageUrl: '/images/menu5.jpg',
    nameJa: '夫婦関係でお悩みの方',
  },
  {
    imageUrl: '/images/menu6.jpg',
    nameJa: 'その他のお悩み',
  },
];

const SpringCarousel: React.FC = () => {
  return (
    <div className='w-full max-w-7xl mx-auto'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 30000 }}
        loop={true}
        className='pb-6'
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}>
        {menuItems.map((item, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='w-full max-w-xs mx-auto'>
              <MenuCard imageUrl={item.imageUrl} nameJa={item.nameJa} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpringCarousel;
