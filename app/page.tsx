import { HeroSlidesData } from '@/data/sections/heroSliderData';
import { ImageTextData } from '@/data/sections/imageTextData';
import { ScrollingTextData } from '@/data/sections/scrollingTextData';
import { OurServicesData } from '@/data/sections/ourServicesData';
import { RecentProjectData } from '@/data/sections/recentProjectData';
import { WhyChooseUsData } from '@/data/sections/whyChooseUsData';
import { MeetCeoData } from '@/data/sections/meetCeoData';

import HeroSlider from '@/components/sections/HeroSlider';
import ImageText from '@/components/sections/ImageText';
import ScrollingText from '@/components/sections/ScrollingText';
import OurServices from '@/components/sections/OurServices';
import RecentProject from '@/components/sections/RecentProject';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import MeetCeo from '@/components/sections/MeetCeo';
import CareerSpotlight from '@/components/sections/CareerSpotlight';


const Home = () => {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider 
        wrapperCls="with-floating-header"
        slides={HeroSlidesData} 
        navigation={true} 
      />

      {/* Image Text */}
      <ImageText data={ImageTextData} />

      {/* Scrolling Text */}
      <ScrollingText data={ScrollingTextData} />

      {/* Service Section */}
      <OurServices data={OurServicesData} />

      {/* Recent Projects */}
      <RecentProject data={RecentProjectData} />

      {/* Why Choose Us */}
      <WhyChooseUs data={WhyChooseUsData} />

      {/* Meet Our CEO */}
      <MeetCeo data={MeetCeoData} />

      {/* Career Spotlight Banner */}
      <CareerSpotlight />
    </>
  );
}

export default Home;
