import { HeroSlidesData } from '@/data/sections/heroSliderData';
import { ImageTextData } from '@/data/sections/imageTextData';
import { ScrollingTextData } from '@/data/sections/scrollingTextData';
import { OurServicesData } from '@/data/sections/ourServicesData';
import { RecentProjectData } from '@/data/sections/recentProjectData';
import { WhyChooseUsData } from '@/data/sections/whyChooseUsData';
import { MeetCeoData } from '@/data/sections/meetCeoData';
import { MeetPartnersData } from '@/data/sections/meetPartnersData';

import HeroSlider from '@/components/sections/HeroSlider';
import ImageText from '@/components/sections/ImageText';
import ScrollingText from '@/components/sections/ScrollingText';
import OurServices from '@/components/sections/OurServices';
import RecentProject from '@/components/sections/RecentProject';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import MeetCeo from '@/components/sections/MeetCeo';
import MeetPartners from '@/components/sections/MeetPartners';


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

      {/* Meet Our Partners - Moving Banner */}
      <MeetPartners data={MeetPartnersData} />
    </>
  );
}

export default Home;
