import type { NextPage } from 'next';
import HeroSection from '../components/sections/HeroSection';
import ConceptSection from '../components/sections/ConceptSection';
import ServiceSection from '../components/sections/ServiceSection';
import ProcessSection from '../components/sections/ProcessSection';
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
      <div id='about'>
        <AboutSection />
      </div>

      {/* PROCESS SECTION */}
      <div id='process'>
        <ProcessSection />
      </div>

      {/* メニュー SECTION */}
      <div id='menu'>
        <MenuSection />
      </div>
    </>
  );
};

export default Page;
