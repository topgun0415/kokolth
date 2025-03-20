import type { NextPage } from 'next';
import { Hero } from '../components/organisms/Hero';
import { MenuSection } from '../components/organisms/MenuSection';
import { Typography } from '../components/atoms/Typography';
import Image from 'next/image';
import { Button } from '../components/atoms/Button';

const Page: NextPage = () => {
  return (
    <>
      <Hero title='KOKOLTH' subtitle='mail counseling room' />

      {/* コンセプト SECTION */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col-reverse justify-between items-center text-center lg:flex-row lg:text-left lg:items-start'>
            <div className='mb-5 max-w-2xl'>
              <Typography
                variant='h2'
                weight='medium'
                color='primary'
                font='josefin'>
                ABOUT US
              </Typography>
              <Typography
                variant='subtitle'
                weight='medium'
                color='primary'
                font='josefin'
                className='max-w-2xl'>
                カウンセラーよりご挨拶
              </Typography>
              <br />
              <Typography
                variant='caption'
                weight='medium'
                color='primary'
                font='josefin'
                className='max-w-2xl'>
                はじめまして！ <br />
                管理栄養士、心理カウンセラーの石松寿子と申します。
                <br />
                <br />
                ４８歳の時に次男を出産し、
                <br />
                高齢出産を希望される方のご参考になることを目指して
                <br />
                スレッズにて発信をしておりましたが、
                <br />
                この度、さらに細かいご質問やお悩みに、個人的に詳しく丁寧にお答えしながら
                <br />
                皆さんの人生に寄り添える存在になれればと
                <br />
                カウンセリングルームを開設いたしました。
                <br />
                <br />
                高齢での妊娠や出産はセンシティブな内容ゆえに、
                <br />
                誰にでもなんでも 相談できるわけではありません。
                <br />
                今不安な気持ちや迷いでもやもやした思いを抱えているという方、
                <br />
                ご自分の状況やお気持ち、ご質問をどうぞメールでお聞かせください。
                <br />
                こんなこと聞いたら失礼かなとか、不謹慎かなという心配は不要です。
                <br />
                どんな内容でも、しっかりと受け止めさせて頂きます。
                <br />
                ご参考までに、私の考えや経験も少しお伝えいたします。
                <br />
                その上で、ご自分の望む未来へ、一緒に進んでいきましょう。
                <br />
                <br />
                管理栄養士が本職なので、食生活に関するご質問も大歓迎です。
                <br />
                カウンセラーは心の専門家であると同時に相談された方の最大の味方でもあります。
                <br />
                皆様のお気持ちがすっきりして、爽快な気分で生きていかれますよう全力で応援いたします。
              </Typography>
              <br />
              <Button variant='primary' size='md' className='mt-5'>
                詳しく見る
              </Button>
            </div>

            {/* 이미지 영역 */}
            <div className='mb-6 lg:mb-0'>
              <Image
                src='/images/child1.png'
                alt='Counselor'
                width={500}
                height={240}
              />
            </div>
          </div>
        </div>
      </section>

      {/* メニュー SECTION */}
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
              <Button variant='primary' size='md'>
                詳しく見る
              </Button>
            </div>
          </div>
          <MenuSection />
        </div>
      </section>
    </>
  );
};

export default Page;
