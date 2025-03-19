import { Typography } from '../atoms/Typography';
import AccessCardLine from '../atoms/AccessCardLine';

export const AccessCard = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='mb-4'>
          <Typography variant='h5' weight='bold' color='primary'>
            アクセス
          </Typography>
        </div>
        <div className='mb-4'>
          <Typography variant='body' color='gray'>
            JR博多駅筑紫口より徒歩7分
          </Typography>
        </div>
      </div>
      <AccessCardLine />

      <div className='mt-4'>
        <div className=' flex items-center justify-between'>
          <div className='mb-4'>
            <Typography variant='h5' weight='bold' color='primary'>
              営業時間
            </Typography>
          </div>
          <div className='mb-4'>
            <Typography variant='body' color='gray'>
              平日 8:00-19:30 <br />
              土日祝 10:00-19:00
            </Typography>
          </div>
        </div>
      </div>
      <AccessCardLine />

      <div className='mt-4'>
        <div className=' flex items-center justify-between'>
          <div className='mb-4'>
            <Typography variant='h5' weight='bold' color='primary'>
              座席
            </Typography>
          </div>
          <div className='mb-4'>
            <Typography variant='body' color='gray'>
              店内（カウンター：8席 テーブル：10席） <br />
              オープンテラス（テーブル：8席） <br />
              ※雨天の場合、テラス席はご使用できません。
            </Typography>
          </div>
        </div>
      </div>
      <AccessCardLine />

      <div className='mt-4'>
        <div className=' flex items-center justify-between'>
          <div className='mb-4'>
            <Typography variant='h5' weight='bold' color='primary'>
              店内設備
            </Typography>
          </div>
          <div className='mb-4'>
            <Typography variant='body' color='gray'>
              FREE Wi-Fi＆コンセントあり
            </Typography>
          </div>
        </div>
      </div>
      <AccessCardLine />

      <div className='mt-4'>
        <div className=' flex items-center justify-between'>
          <div className='mb-4'>
            <Typography variant='h5' weight='bold' color='primary'>
              TEL
            </Typography>
          </div>
          <div className='mb-4'>
            <Typography variant='body' color='gray'>
              <a
                href='tel:0921231234'
                className='text-blue-600 hover:underline'>
                092-123-1234
              </a>
            </Typography>
          </div>
        </div>
      </div>
      <AccessCardLine />

      <div className='mt-4'>
        <div className=' flex items-center justify-between'>
          <div className='mb-4'>
            <Typography variant='h5' weight='bold' color='primary'>
              Email
            </Typography>
          </div>
          <div className='mb-4'>
            <Typography variant='body' color='gray'>
              <a
                href='mailto:kokolth@example.co.jp'
                className='text-blue-600 hover:underline'
                target='_blank'
                rel='noopener noreferrer'>
                kokolth@example.co.jp
              </a>
            </Typography>
          </div>
        </div>
      </div>
      <AccessCardLine />
    </>
  );
};

export default AccessCard;
