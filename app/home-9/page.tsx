import { HeroVideoBannerData } from "@/data/sections/heroVideoBannerData";
import { ImageCounterVideoData } from "@/data/sections/imageCounterVideoData";
import { OurExpertiseData } from "@/data/sections/ourExpertiseData";
import { WhyChooseUsData4 } from "@/data/sections/whyChooseUsData4";
import { RecentProjectSliderData } from "@/data/sections/recentProjectSliderData";
import { TestimonialData } from "@/data/sections/testimonialData";
import { TeamSliderData } from "@/data/sections/teamSliderData";
import { FeaturedBlog2Data } from "@/data/sections/featuredBlog2Data";

import HeroVideoBanner from "@/components/sections/HeroVideoBanner";
import ImageCounterVideo from "@/components/sections/ImageCounterVideo";
import OurExpertise from "@/components/sections/OurExpertise";
import WhyChooseUs6 from "@/components/sections/WhyChooseUs6";
import RecentProjectSlider from "@/components/sections/RecentProjectSlider";
import Testimonials from "@/components/sections/Testimonials";
import TeamSlider3 from "@/components/sections/TeamSlider3";
import FeaturedBlog3 from "@/components/sections/FeaturedBlog3";

const Home9 = () => {
  return (
    <>
      {/* Hero Banner */}
      <HeroVideoBanner data={HeroVideoBannerData} />

      {/* About Us */}
      <ImageCounterVideo data={ImageCounterVideoData} />

      {/* Our Expertise */}
      <OurExpertise data={OurExpertiseData} />

      {/* Why Choose Us */}
      <WhyChooseUs6 data={WhyChooseUsData4} />

      {/* Recent Project */}
      <RecentProjectSlider data={RecentProjectSliderData} pagination={true} />

      {/* Testimonials */}
      <Testimonials data={TestimonialData} />

      {/* Team Slider */}
      <TeamSlider3 data={TeamSliderData} />
      
      {/* Featured Blog */}
      <FeaturedBlog3 data={FeaturedBlog2Data} />
    </>
  );
};

export default Home9;
