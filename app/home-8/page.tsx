import { HeroSlides2Data } from "@/data/sections/heroSlider2Data";
import { OurServicesData } from "@/data/sections/ourServicesData";
import { RecentProjectGridData } from "@/data/sections/recentProjectGridData";
import { FaqData } from "@/data/sections/faqData";
import { WhyChooseUsData2 } from "@/data/sections/whyChooseUsData2";
import { TeamSliderData } from "@/data/sections/teamSliderData";
import { TestimonialSlider2Data } from "@/data/sections/testimonial2Data";
import { FeaturedBlog2Data } from "@/data/sections/featuredBlog2Data";

import HeroSlider2 from "@/components/sections/HeroSlider2";
import OurServicesThree from "@/components/sections/OurServicesThree";
import RecentProjectGrid4 from "@/components/sections/RecentProjectGrid4";
import Faq2 from "@/components/sections/Faq2";
import WhyChooseUs5 from "@/components/sections/WhyChooseUs5";
import TeamSlider from "@/components/sections/TeamSlider";
import TestimonialSlider3 from "@/components/sections/TestimonialSlider3";
import FeaturedBlog5 from "@/components/sections/FeaturedBlog5";

const Home8 = () => {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider2 
        wrapperCls="with-floating-header"
        slides={HeroSlides2Data}
      />

      {/* Our Services */}
      <OurServicesThree data={OurServicesData} />

      {/* Recent Project */}
      <RecentProjectGrid4 data={RecentProjectGridData} />

      {/* Working Process */}
      <Faq2 data={FaqData} />

      {/* Why Choose Us */}
      <WhyChooseUs5 data={WhyChooseUsData2} />

      {/* Our Team */}
      <TeamSlider data={TeamSliderData} pagination={true} />

      {/* Testimonial Slider */}
      <TestimonialSlider3 data={TestimonialSlider2Data} pagination={true} />

      {/* Featured Blog */}
      <FeaturedBlog5 data={FeaturedBlog2Data} />
    </>
  );
};

export default Home8;
