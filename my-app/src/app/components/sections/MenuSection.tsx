'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { MenuCard } from '../molecules/MenuCard';
import { Typography } from '../atoms/Typography';

const menuItems = [
  {
    imageUrl: '/images/menu1.jpg',
    nameJa: '高齢出産に関してお悩みの方',
    alt: '高齢出産に関してお悩みの方',
    description:
      '日本の出生率は低下しているけど４０代の出生率は上昇しています。' +
      'とはいえ高齢ゆえの悩みは尽きませんよね。私もそうでした。' +
      '４７歳で妊娠した私の経験についても、個別メールなので遠慮なくなんでも聞いてください！' +
      'SNSでは話せないこともたくさんお伝えしますね。',
  },
  {
    imageUrl: '/images/menu2.jpg',
    nameJa: '妊活中でお気持ちを吐き出したい方',
    alt: '妊活中でお気持ちを吐き出したい方',
    description:
      '妊活中は人に言えない思いをたくさん抱える時期です。' +
      '自分の体験や思いをなんでも話せる人ってなかなかいませんよね。' +
      'メールでのカウンセリングですので、なんでも吐き出してくださいね。',
  },
  {
    imageUrl: '/images/menu3.jpg',
    nameJa: '妊娠中でお悩みがある方',
    alt: '妊娠中でお悩みがある方',
    description:
      '妊娠中はホルモンバランスの変化でメンタルが大揺れする期間です。' +
      'お腹の赤ちゃんのためにはママがリラックスして過ごすのが一番。' +
      'どんなお悩みでもご相談ください。',
  },
  {
    imageUrl: '/images/menu4.jpg',
    nameJa: '高齢で育児をされている方',
    alt: '高齢で育児をされている方',
    description:
      '高齢ママならではの悩みは尽きませんね。現在私も50歳で２歳を' +
      '育てていますので、お気持ちがよくわかります。高齢ママだからこそ' +
      '実現できる子育ての楽しみ方があります。一緒に探しましょう！',
  },
  {
    imageUrl: '/images/menu5.jpg',
    nameJa: '夫婦関係でお悩みの方',
    alt: '夫婦関係でお悩みの方',
    description:
      '夫婦関係は全ての根幹です。私は離婚寸前まで夫婦関係が崩壊していた' +
      '時期を経て、復縁からの次男出産というサプライズを経験しました。' +
      '今どんな状態でも、良い関係を作ることは可能です。ぜひご相談ください。',
  },
  {
    imageUrl: '/images/menu6.jpg',
    nameJa: 'その他のお悩み',
    alt: 'その他のお悩み',
    description:
      '上記の項目とは全く関係ないお悩みでも、誰かに聞いてほしいだけという内容でも' +
      '大丈夫です。しっかり受け止めさせて頂きます。',
  },
];

const MenuSection: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [modalReady, setModalReady] = useState(false);

  useEffect(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      // 마운트될 때 document.body를 사용합니다
      Modal.setAppElement('body');
      setModalReady(true);

      // 전체 페이지에 적용할 블러 스타일 추가
      const style = document.createElement('style');
      style.id = 'blur-overlay-style';
      style.innerHTML = `
        .blur-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          transition: all 0.3s ease-in-out;
          opacity: 0;
          pointer-events: none;
        }
        
        .blur-overlay.active {
          opacity: 1;
          pointer-events: all;
        }
      `;
      document.head.appendChild(style);

      // 블러 오버레이 요소 추가
      const overlay = document.createElement('div');
      overlay.className = 'blur-overlay';
      overlay.id = 'blur-overlay';
      document.body.appendChild(overlay);
    }

    // 클린업 함수
    return () => {
      const style = document.getElementById('blur-overlay-style');
      const overlay = document.getElementById('blur-overlay');
      if (style) style.remove();
      if (overlay) overlay.remove();
    };
  }, []);

  // 모달 상태에 따라 블러 오버레이 제어
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const overlay = document.getElementById('blur-overlay');

      if (modalIsOpen) {
        // 모달이 열릴 때 블러 활성화 및 스크롤 방지
        document.body.style.overflow = 'hidden';
        if (overlay) overlay.classList.add('active');
      } else {
        // 모달이 닫힐 때 블러 비활성화 및 스크롤 허용
        document.body.style.overflow = 'unset';
        if (overlay) overlay.classList.remove('active');
      }
    }
  }, [modalIsOpen]);

  const openModal = (item: (typeof menuItems)[0]) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto px-4'>
          <div className='text-left mb-12'>
            <div className='flex justify-baseline items-baseline'>
              <Typography
                variant='h2'
                weight='medium'
                color='primary'
                font='josefin'
                className='mb-4 me-4'>
                こんなお悩みの方へ
              </Typography>
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto relative'>
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
                      onClick={() => openModal(item)}
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

              /* 모달 스타일 */
              .ReactModal__Overlay {
                opacity: 0;
                transition: opacity 200ms ease-in-out;
                background-color: transparent !important; /* 배경을 투명하게 설정 */
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .ReactModal__Overlay--after-open {
                opacity: 1;
              }

              .ReactModal__Overlay--before-close {
                opacity: 0;
              }

              .ReactModal__Content {
                position: relative !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                bottom: auto !important;
                max-width: 90%;
                width: 600px;
                padding: 20px;
                border: 1px solid #ccc;
                background: #fff;
                border-radius: 8px;
                max-height: 90vh;
                overflow: auto;
                transform: scale(0.8);
                transition: transform 200ms ease-in-out;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
              }

              .ReactModal__Content--after-open {
                transform: scale(1);
              }

              .ReactModal__Content--before-close {
                transform: scale(0.8);
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* 모달 - 클라이언트 사이드에서만 렌더링 */}
      {modalReady && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Menu Item Details'
          closeTimeoutMS={200}
          ariaHideApp={modalReady}>
          <div className='text-center'>
            <Typography
              variant='h3'
              weight='medium'
              color='primary'
              font='josefin'
              className='mb-4'>
              {selectedItem.nameJa}
            </Typography>
            <div className='relative w-full h-64 mb-4'>
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.alt}
                fill
                className='object-cover rounded-md'
              />
            </div>
            <div className='mt-8'>
              <Typography
                variant='body'
                weight='regular'
                color='dark'
                className='mb-8'>
                このようなお悩みについて、メールカウンセリングで詳しくお話を伺います。
                あなたのペースでゆっくりとお気持ちを整理していきましょう。
              </Typography>
            </div>
            <button
              onClick={closeModal}
              className='mt-4 bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-6 rounded-md'>
              閉じる
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MenuSection;
