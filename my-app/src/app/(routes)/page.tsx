import type { NextPage } from 'next';
import HeroSection from '../components/sections/HeroSection';
import ConceptSection from '../components/sections/ConceptSection';
import ServiceSection from '../components/sections/ServiceSection';
import MenuSection from '../components/sections/MenuSection';
import AboutSection from '../components/sections/AboutSection';

const Page: NextPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection title='KOKOLTH' subtitle='mail counseling room' />

      {/* CONCEPT SECTION */}
      <div id='concept'>
        <ConceptSection />
      </div>

      {/* OUR SERVICE SECTION */}
      <div id='service'>
        <ServiceSection />
      </div>

      {/* OUR SERVICE SECTION */}
      <AboutSection />

      {/* メニュー SECTION */}
      <MenuSection />
    </>
  );
};

export default Page;
