// src/pages/index.tsx
import type { NextPage } from 'next';
import { Hero } from '../components/organisms/Hero';
import { AccessSection } from '../components/organisms/AccessSection';
import { MenuSection } from '../components/organisms/MenuSection';
import { Typography } from '../components/atoms/Typography';
import Image from 'next/image';
import { Button } from '../components/atoms/Button';

const Page: NextPage = () => {
  return (
    <>
      <Hero title='Kokolth' subtitle='Male counseling room' />

      {/* コンセプト SECTION */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between'>
            <div className='text-left mb-5'>
              <Typography
                variant='h2'
                weight='regular'
                color='primary'
                className=''>
                ABOUT US
              </Typography>
              <Typography variant='subtitle' color='gray' className='max-w-2xl'>
                カウンセラーよりご挨拶
              </Typography>
              <br />
              <Typography
                variant='caption'
                color='gray'
                className='max-w-2xl mx-auto'>
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
            </div>
            <div className=''>
              <Image src='/images/child1.png' alt='' width={500} height={240} />
            </div>
          </div>
        </div>
      </section>

      {/* メニュー SECTION */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-left mb-12'>
            <div className='flex justify-baseline items-baseline'>
              <Typography
                variant='h2'
                weight='regular'
                color='primary'
                className='mb-4 me-4'>
                こんなお悩みの方へ
              </Typography>
              <Button variant='primary' size='lg'>
                詳しく見る
              </Button>
            </div>
          </div>
          <MenuSection />
        </div>
      </section>

      {/* アクセス SECTION */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-left mb-12'>
            <Typography
              variant='h3'
              weight='bold'
              color='primary'
              className='mb-4'>
              Kokolth 福岡店
            </Typography>
            <Typography
              variant='subtitle'
              color='gray'
              className='max-w-2xl text-left'>
              〒812-0013
            </Typography>
            <Typography
              variant='subtitle'
              color='gray'
              className='max-w-2xl text-left'>
              福岡県福岡市博多区博多駅東3丁目5-15 アサヒ緑健本社ビル1F
            </Typography>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <AccessSection />
            </div>
            <div className='rounded-lg overflow-hidden'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.7789882580844!2d130.42197267677173!3d33.589348973296804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x354191b2cb8f2fc9%3A0x26998c26070ee7dc!2z44CSODEyLTAwMTMg56aP5bKh55yM5YyX5b6u5biC5YyX5b6u5Yy66YOh5aC077yT5LiB55uu77yR4oiS77yR77yS!5e0!3m2!1sen!2sjp!4v1692123456789!5m2!1sen!2sjp'
                width='100%'
                height='500'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
