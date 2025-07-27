import { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  title: '高齢出産・妊活の悩みをメールで解決 | ココルス (Kokolth)',
  description:
    '高齢出産・妊活・妊娠中・高齢育児・夫婦関係の不安に、48歳で出産した管理栄養士×心理カウンセラーがメールカウンセリングで寄り添い、栄養と心を同時にサポート。24時間対応、匿名相談OK。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kokolth.com',
    site_name: 'Kokolth',
    title: '高齢出産・妊活の悩みをメールで解決 | ココルス (Kokolth)',
    description:
      '48歳で出産経験のある心理カウンセラーが、高齢出産や妊活の悩みをメールでサポート。匿名OK、24時間対応。',
    images: [
      {
        url: 'https://kokolth.com/images/heroImage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kokolth メールカウンセリング OG Image',
      },
    ],
  },
  additionalMetaTags: [
    {
      property: 'al:web:should_fallback',
      content: 'true',
    },
  ]
};

export default SEO;