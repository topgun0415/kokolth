import React from 'react';

interface FooterIntroCardProps {
  children?: never;
}

const FooterIntroCard: React.FC<FooterIntroCardProps> = ({}) => {
  return (
    <>
      <div className='flex justify-between items-center gap-7 text-sm'>
        <div>
          kokolth@example.com
          <br />
          〒812-0013 福岡県福岡市博多区博多駅東3丁目5-15
          <br />
          3-5-15 Hakataeki Higashi Hakata-ku,
          <br />
          Fukuoka-shi, Fukuoka-ken 812-0013
        </div>
      </div>
    </>
  );
};

export default FooterIntroCard;
