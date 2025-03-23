import React from 'react';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';

const AboutSection: React.FC = () => {
  return (
    <>
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col-reverse justify-between items-center text-left lg:flex-row lg:text-left lg:items-start'>
            <div className='mb-5 max-w-2xl'>
              <div className='flex items-center gap-4 lg:hidden'>
                <div>
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
                </div>

                <div
                  className='rounded-full overflow-hidden border-2 border-gray-50 shadow-sm flex-shrink-0'
                  style={{ width: 150, height: 150 }}>
                  <Image
                    src='/images/child1.png'
                    alt='Counselor'
                    width={70}
                    height={70}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='hidden lg:block'>
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
              </div>

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
                この度、さらに細かいご質問やお悩みに、
                <br />
                個人的に詳しく丁寧にお答えしながら
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
                今不安な気持ちや迷いでもやもやした思いを抱えている
                <br />
                という方、ご自分の状況やお気持ち、
                <br />
                ご質問をどうぞメールでお聞かせください。
                <br />
                こんなこと聞いたら失礼かなとか、
                <br />
                不謹慎かなという心配は不要です。
                <br />
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
                皆様のお気持ちがすっきりして、爽快な気分で生きていかれますよう全力で応援いたします。
              </Typography>
              <br />
            </div>

            <div className='hidden lg:block lg:ml-8 mt-15'>
              <Image
                src='/images/child1.png'
                alt='Counselor'
                width={400}
                height={240}
                className='rounded-lg shadow-md'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
