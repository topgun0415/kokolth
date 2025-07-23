import type { NextPage } from 'next';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import HeroSection from '../components/sections/HeroSection';
import ConceptSection from '../components/sections/ConceptSection';
import ServiceSection from '../components/sections/ServiceSection';
import ProcessSection from '../components/sections/ProcessSection';
import MenuSection from '../components/sections/MenuSection';
import AboutSection from '../components/sections/AboutSection';
import PriceSection from '../components/sections/PriceSection';
import PaymentSection from '../components/sections/PaymentSection';
import PostSection from '../components/sections/PostSection';
import Shade from '../components/organisms/Shade';
import LineChatButton from '../components/atoms/LineChatButton';

const Page: NextPage = () => {
  return (
    <div className='relative'>
      <Shade />
      {/* HEADER SECTION - Above Shade */}
      <Header />

      {/* HERO SECTION - Above Shade */}
      <div className='relative'>
        <HeroSection title='KOKOLTH' subtitle='mail counseling room' />
      </div>

      {/* CONCEPT SECTION - Below Shade */}
      <div id='concept' className='relative'>
        <ConceptSection />
      </div>

      {/* POST SECTION - Above Shade */}
      <div id='news' className='relative'>
        <PostSection />
      </div>

      {/* OUR SERVICE SECTION - Above Shade */}
      <div id='service' className='relative'>
        <ServiceSection />
      </div>

      {/* ABOUT SECTION - Above Shade */}
      <div id='about' className='relative'>
        <AboutSection />
      </div>

      {/* PROCESS SECTION - Above Shade */}
      <div id='process' className='relative'>
        <ProcessSection />
      </div>

      {/* MENU SECTION - Above Shade */}
      <div id='menu' className='relative'>
        <MenuSection />
      </div>

      {/* PRICE SECTION - Above Shade */}
      <div id='price' className='relative'>
        <PriceSection />
      </div>

      {/* PAYMENT SECTION - Above Shade */}
      <div id='payment' className='relative'>
        <PaymentSection />
      </div>

      {/* LINE CHAT BUTTON - Below Shade */}
      <LineChatButton />

      {/* FOOTER SECTION - Below Shade */}
      <Footer />
    </div>
  );
};

export default Page;
