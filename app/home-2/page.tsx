import { BannerWithSliderData } from '@/data/sections/bannerWithSliderData';
import { ImageText2Data } from '@/data/sections/imageText2Data';
import { OurServicesDataAccordion } from '@/data/sections/ourServicesDataAccordion';
import { FeaturedProjectData } from '@/data/sections/featuredProjectData';
import { WhyChooseUsGridData } from '@/data/sections/whyChooseUsGridData';
import { PricingPlanData } from '@/data/sections/pricingPlanData';
import { FaqData } from '@/data/sections/faqData';
import { TestimonialSliderThumbData } from '@/data/sections/testimonialSliderThumbData';
import { FeaturedBlogData } from '@/data/sections/featuredBlogData';

import BannerWithSlider from "@/components/sections/BannerWithSlider";
import ImageText2 from '@/components/sections/ImageText2';
import OurServicesAccordion from '@/components/sections/OurServicesAccordion';
import ProjectSlider from '@/components/sections/ProjectSlider';
import WhyChooseUsGrid from '@/components/sections/WhyChooseUsGrid';
import PricingPlan from '@/components/sections/PricingPlan';
import TestimonialSliderWithThumb from '@/components/sections/TestimonialSliderWithThumb';
import Faq from '@/components/sections/Faq';
import FeaturedBlog from '@/components/sections/FeaturedBlog';


const Home2 = () => {
    return(
        <>
            {/* Banner Slider */}
            <BannerWithSlider data={BannerWithSliderData} />

            {/* Image Text */}
            <ImageText2 data={ImageText2Data} />

            {/* Service Section */}
            <OurServicesAccordion data={OurServicesDataAccordion} />

            {/* Recent Projects */}
            <ProjectSlider data={FeaturedProjectData} />

            {/* Why Choose Us */}
            <WhyChooseUsGrid data={WhyChooseUsGridData} />

            {/* Pricing Plan */}
            <PricingPlan data={PricingPlanData} />

            {/* Testimonial Slider with Thumb */}
            <TestimonialSliderWithThumb data={TestimonialSliderThumbData} />

            {/* FAQ */}
            <Faq data={FaqData} />

            {/* Featured Blog */}
            <FeaturedBlog data={FeaturedBlogData} />
        </>
    )
}

export default Home2;