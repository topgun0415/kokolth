import type { NextPage } from 'next';
import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import MenuSection from '../components/sections/MenuSection';
import AboutSection from '../components/sections/AboutSection';

const Page: NextPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection title='KOKOLTH' subtitle='mail counseling room' />

      {/* イントロ SECTION */}
      <IntroSection />

      {/* コンセプト SECTION */}
      <AboutSection />

      {/* メニュー SECTION */}
      <MenuSection />
    </>
  );
};

export default Page;
