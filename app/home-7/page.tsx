import { HeroTextBannerData2 } from "@/data/sections/heroTextBannerData2";
import { OurServicesData } from "@/data/sections/ourServicesData";
import { ScrollingLargeTextData } from "@/data/sections/scrollingLargeTextData";
import { WhyChooseUsData3 } from "@/data/sections/whyChooseUsData3";
import { PricingPlanData } from "@/data/sections/pricingPlanData";
import { ourCompanydata } from "@/data/sections/ourCompanyData";
import { RecentProjectGridData } from "@/data/sections/recentProjectGridData";
import { TestimonialSlider2Data } from "@/data/sections/testimonial2Data";
import { FeaturedBlogData } from "@/data/sections/featuredBlogData";
import { Contact2Data } from "@/data/sections/contact2Data";

import HeroTextBanner2 from "@/components/sections/HeroTextBanner2";
import OurServicesSix2 from "@/components/sections/OurServicesSix2";
import ScrollingLargeText2 from "@/components/sections/ScrollingLargeText2";
import WhyChooseUs4 from "@/components/sections/WhyChooseUs4";
import PricingPlan2 from "@/components/sections/PricingPlan2";
import OurCompany from "@/components/sections/OurCompany";
import RecentProjectGrid3 from "@/components/sections/RecentProjectGrid3";
import TestimonialSlider2 from "@/components/sections/TestimonialSlider2";
import FeaturedBlog4 from "@/components/sections/FeaturedBlog4";
import ContactSection from "@/components/sections/Contact";

const Home6 = () => {
  return (
    <>
      {/* Hero Banner */}
      <HeroTextBanner2 data={HeroTextBannerData2} />

      {/* Service Section */}
      <OurServicesSix2 data={OurServicesData} />

      {/* Scrolling Text */}
      <ScrollingLargeText2 data={ScrollingLargeTextData} />

      {/* Why Choose Us */}
      <WhyChooseUs4 data={WhyChooseUsData3} />

      {/* Pricing Plan */}
      <PricingPlan2 data={PricingPlanData} />

      {/* Our Company */}
      <OurCompany data={ourCompanydata} />

      {/* Recent Project */}
      <RecentProjectGrid3 data={RecentProjectGridData} />

      {/* Testimonial Slider */}
      <TestimonialSlider2 data={TestimonialSlider2Data} pagination={true} />

      {/* Featured Blog */}
      <FeaturedBlog4 data={FeaturedBlogData} />

      {/* Contact Form */}
      <ContactSection data={Contact2Data} />
    </>
  );
};

export default Home6;
