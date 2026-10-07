import { HeroTextBannerData } from "@/data/sections/heroTextBannerData";
import { ScrollingLargeTextData } from "@/data/sections/scrollingLargeTextData";
import { ServicesSliderHeadingsData } from "@/data/sections/servicesSliderHeadings";
import { RecentProjectGridData } from "@/data/sections/recentProjectGridData";
import { CounterUpData } from "@/data/sections/counterUpData";
import { WorkingProcessAccordionData } from "@/data/sections/workingProcessAccordionData";
import { WhyChooseUsData } from "@/data/sections/whyChooseUsData";
import { TestimonialSlider2Data } from "@/data/sections/testimonial2Data";
import { FeaturedBlogHorizontal2Data } from '@/data/sections/featuredBlogHorizontal2Data';

import HeroTextBanner from "@/components/sections/HeroTextBanner";
import ScrollingLargeText from "@/components/sections/ScrollingLargeText";
import ServicesSlider from "@/components/sections/ServicesSlider";
import RecentProjectGrid from "@/components/sections/RecentProjectGrid";
import CounterUp from "@/components/sections/CounterUp";
import WorkingProcessAccordion from "@/components/sections/WorkingProcessAccordion";
import WhyChooseUs2 from "@/components/sections/WhyChooseUs2";
import TestimonialSlider2 from "@/components/sections/TestimonialSlider2";
import FeaturedBlogHorizontal from "@/components/sections/FeaturedBlogHorizontal";


const Page = () => {
    return (
        <>
            {/* Hero Banner */}
            <HeroTextBanner data={HeroTextBannerData} />

            {/* Scrolling Text */}
            <ScrollingLargeText data={ScrollingLargeTextData} />

            {/* Service */}
            <ServicesSlider 
                data={ServicesSliderHeadingsData} 
                pagination={true}
            />
            {/* Recent Projects */}
            <RecentProjectGrid data={RecentProjectGridData} />

            {/* Counter Up */}
            <CounterUp data={CounterUpData} />

            {/* Working Process */}
            <WorkingProcessAccordion data={WorkingProcessAccordionData} />

            {/* Why Choose Us */}
            <WhyChooseUs2 data={WhyChooseUsData} />

            {/* Testimonial Slider */}
            <TestimonialSlider2 
                data={TestimonialSlider2Data} 
                pagination={true} 
            />

            {/* Featured Blog */}
            <FeaturedBlogHorizontal data={FeaturedBlogHorizontal2Data} />
        </>
    )
}

export default Page;