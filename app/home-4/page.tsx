import { HeroBannerButtonData } from "@/data/sections/heroBannerButtonData";
import { ScrollingTextGradientData } from "@/data/sections/scrollingTextGradientData";
import { AboutData } from "@/data/sections/aboutUsData";
import { CounterUpData } from "@/data/sections/counterUpData";
import { WorkingProcessData } from "@/data/sections/workingProcessData";
import { TextBanner2Data } from "@/data/sections/textBanner2Data";
import { OurServicesData } from '@/data/sections/ourServicesData';
import { RecentProject2Data } from "@/data/sections/recentProject2Data";
import { TeamSliderData } from '@/data/sections/teamSliderData';
import { TestimonialData } from "@/data/sections/testimonialData";
import { FaqData } from "@/data/sections/faqData";
import { FeaturedBlogHorizontalData } from '@/data/sections/featuredBlogHorizontalData';

import HeroBannerButton from "@/components/sections/HeroBannerButton";
import ScrollingTextGradient from "@/components/sections/ScrollingTextGradient";
import AboutUs from "@/components/sections/AboutUs";
import CounterUp from "@/components/sections/CounterUp";
import WorkingProcess from "@/components/sections/WorkingProcess";
import TextBanner from "@/components/sections/TextBanner";
import OurServicesSixHorizontal from "@/components/sections/OurServicesSixHorizontal";
import RecentProject from '@/components/sections/RecentProject';
import TeamSlider from '@/components/sections/TeamSlider';
import Testimonials from "@/components/sections/Testimonials";
import Faq from '@/components/sections/Faq';
import FeaturedBlogHorizontal from "@/components/sections/FeaturedBlogHorizontal";

const Home4 = () => {
    return(
        <>
            {/* Hero Banner */}
            <HeroBannerButton data={HeroBannerButtonData} />

            {/* Scrolling Text */}
            <ScrollingTextGradient data={ScrollingTextGradientData} />

            {/* About Us */}
            <AboutUs data={AboutData} />

            {/* Counter Up */}
            <CounterUp data={CounterUpData} />

            {/* Working Process */}
            <WorkingProcess data={WorkingProcessData} />

            {/* Text Banner */}
            <TextBanner data={TextBanner2Data} />

            {/* Service Section */}
            <OurServicesSixHorizontal data={OurServicesData} />

            {/* Recent Projects */}
            <RecentProject data={RecentProject2Data} />

            {/* Our Team */}
            <TeamSlider 
                data={TeamSliderData} 
                pagination={true}
            />

            {/* Testimonials */}
            <Testimonials data={TestimonialData} />

            {/* FAQ */}
            <Faq data={FaqData} />

            {/* Featured Blog */}
            <FeaturedBlogHorizontal data={FeaturedBlogHorizontalData} />
        </>
    )
}

export default Home4;