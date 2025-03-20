import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { MenuCard } from '../atoms/MenuCard';

const menuItems = [
  {
    imageUrl: '/images/menu1.jpg',
    nameJa: '高齢出産に関してお悩みの方',
    alt: '高齢出産に関してお悩みの方',
  },
  {
    imageUrl: '/images/menu2.jpg',
    nameJa: '妊活中でお気持ちを吐き出したい方',
    alt: '妊活中でお気持ちを吐き出したい方',
  },
  {
    imageUrl: '/images/menu3.jpg',
    nameJa: '妊娠中でお悩みがある方',
    alt: '妊娠中でお悩みがある方',
  },
  {
    imageUrl: '/images/menu4.jpg',
    nameJa: '高齢で育児をされている方',
    alt: '高齢で育児をされている方',
  },
  {
    imageUrl: '/images/menu5.jpg',
    nameJa: '夫婦関係でお悩みの方',
    alt: '夫婦関係でお悩みの方',
  },
  {
    imageUrl: '/images/menu6.jpg',
    nameJa: 'その他のお悩み',
    alt: 'その他のお悩み',
  },
];

const SpringCarousel: React.FC = () => {
  return (
    <div className='w-full max-w-7xl mx-auto relative'>
      {/* Swiper 컨테이너 */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 30000 }}
        loop={true}
        pagination={{ el: '.custom-swiper-pagination', clickable: true }}
        className='pb-10'
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}>
        {menuItems.map((item, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='w-full max-w-xs mx-auto'>
              <MenuCard
                imageUrl={item.imageUrl}
                alt={item.alt}
                nameJa={item.nameJa}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex justify-center mt-6'>
        <div className='custom-swiper-pagination'></div>
      </div>

      <style jsx global>{`
        .custom-swiper-pagination {
          position: relative;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #9e9e9e;
          opacity: 1;
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background-color: #747373;
        }
      `}</style>
    </div>
  );
};

export default SpringCarousel;
