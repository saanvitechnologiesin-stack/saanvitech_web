import { HeroLargeTextBannerData } from "@/data/sections/heroLargeTextBannerData";
import { ImageTextVideoData } from "@/data/sections/imageTextVideoData";
import { ScrollingTextData } from "@/data/sections/scrollingTextData";
import { OurServicesData } from "@/data/sections/ourServicesData";
import { WhyChooseUsData2 } from "@/data/sections/whyChooseUsData2";
import { RecentProjectGridData } from "@/data/sections/recentProjectGridData";
import { WorkingProcessStickyData } from "@/data/sections/workingProcessStickyData";
import { PricingPlanData } from "@/data/sections/pricingPlanData";
import { TestimonialSliderThumbData } from "@/data/sections/testimonialSliderThumbData";
import { TeamSliderData } from "@/data/sections/teamSliderData";
import { FeaturedBlog2Data } from "@/data/sections/featuredBlog2Data";

import HeroLargeTextBanner from "@/components/sections/HeroLargeTextBanner";
import ImageTextVideo from "@/components/sections/ImageTextVideo";
import TrustedBrands from "@/components/sections/TrustedBrands";
import OurServicesSixHorizontal2 from "@/components/sections/OurServicesSixHorizontal2";
import WhyChooseUs3 from "@/components/sections/WhyChooseUs3";
import RecentProjectGrid2 from "@/components/sections/RecentProjectGrid2";
import WorkingProcessSticky from "@/components/sections/WorkingProcessSticky";
import PricingPlan from "@/components/sections/PricingPlan";
import TestimonialSliderWithThumb2 from "@/components/sections/TestimonialSliderWithThumb2";
import TeamSlider2 from "@/components/sections/TeamSlider2";
import FeaturedBlog3 from "@/components/sections/FeaturedBlog3";
import FooterContactForm from "@/components/sections/FooterContactForm";

const Home6 = () => {
  return (
    <>
      {/* Hero Banner */}
      <HeroLargeTextBanner data={HeroLargeTextBannerData} />

      {/* Image Text */}
      <ImageTextVideo data={ImageTextVideoData} />

      {/* Trusted Brands */}
      <TrustedBrands data={ScrollingTextData} />

      {/* Service Section */}
      <OurServicesSixHorizontal2 data={OurServicesData} />

      {/* Why Choose Us */}
      <WhyChooseUs3 data={WhyChooseUsData2} />

      {/* Recent Project */}
      <RecentProjectGrid2 data={RecentProjectGridData} />

      {/* Working Process */}
      <WorkingProcessSticky data={WorkingProcessStickyData} />

      {/* Pricing Plan */}
      <PricingPlan data={PricingPlanData} />

      {/* Testimonial */}
      <TestimonialSliderWithThumb2 data={TestimonialSliderThumbData} />

      {/* Our Team */}
      <TeamSlider2 data={TeamSliderData} pagination={true} />

      {/* Featured Blog */}
      <FeaturedBlog3 data={FeaturedBlog2Data} />

      {/* Contact Form */}
      <FooterContactForm container="container" />
    </>
  );
};

export default Home6;
