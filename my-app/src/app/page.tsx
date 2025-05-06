import type { NextPage } from 'next';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import HeroSection from '../components/sections/HeroSection';
import ConceptSection from '../components/sections/ConceptSection';
import ServiceSection from '../components/sections/ServiceSection';
import ProcessSection from '../components/sections/ProcessSection';
import MenuSection from '../components/sections/MenuSection';
import AboutSection from '../components/sections/AboutSection';
import Shade from '../components/organisms/Shade';
import LineChatButton from '../components/atoms/LineChatButton';

const Page: NextPage = () => {
  return (
    <div className='relative'>
      <Shade />
      <Header />
      
      {/* HERO SECTION - Above Shade */}
      <div className='relative z-20'>
        <HeroSection title='KOKOLTH' subtitle='mail counseling room' />
      </div>

      {/* CONCEPT SECTION - Below Shade */}
      <div id='concept' className='relative z-0'>
        <ConceptSection />
      </div>

      {/* OUR SERVICE SECTION - Above Shade */}
      <div id='service' className='relative z-20'>
        <ServiceSection />
      </div>

      {/* ABOUT SECTION - Above Shade */}
      <div id='about' className='relative z-0'>
        <AboutSection />
      </div>

      {/* PROCESS SECTION - Above Shade */}
      <div id='process' className='relative z-20'>
        <ProcessSection />
      </div>

      {/* MENU SECTION - Above Shade */}
      <div id='menu' className='relative z-20'>
        <MenuSection />
      </div>

      <LineChatButton />
      <Footer />
    </div>
  );
};

export default Page;
