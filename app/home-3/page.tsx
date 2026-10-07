import { HeroBannerData } from "@/data/sections/heroBannerData";
import { ScrollingTextData } from '@/data/sections/scrollingTextData';
import { ImageTextData } from '@/data/sections/imageTextData';
import { OurServicesData } from '@/data/sections/ourServicesData';
import { TextBannerData } from "@/data/sections/textBannerData";
import { StickyBannerData } from "@/data/sections/stickyBannerData";
import { TestimonialSliderData } from "@/data/sections/testimonialSliderData";
import { FeaturedBlog2Data } from '@/data/sections/featuredBlog2Data';
import { Contact2Data } from "@/data/sections/contact2Data";

import HeroBanner from "@/components/sections/HeroBanner";
import ScrollingTextFullWidth from '@/components/sections/ScrollingTextFullWidth';
import ImageText from '@/components/sections/ImageText';
import OurServicesSix from '@/components/sections/OurServicesSix';
import TextBanner from "@/components/sections/TextBanner";
import StickyBanner from "@/components/sections/StickyBanner";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import FeaturedBlog2 from '@/components/sections/FeaturedBlog2';
import ContactSection from '@/components/sections/Contact';


const Home3 = () => {
    return(
        <>
            {/* Hero Banner */}
            <HeroBanner data={HeroBannerData} />

            {/* Scrolling Text */}
            <ScrollingTextFullWidth data={ScrollingTextData} />

            {/* Image Text */}
            <ImageText data={ImageTextData} />

            {/* Service Section */}
            <OurServicesSix data={OurServicesData} />

            {/* Text Banner */}
            <TextBanner data={TextBannerData} />

            {/* Sticky Banner */}
            <StickyBanner data={StickyBannerData} />

            {/* Testimonial Slider */}
            <TestimonialSlider 
                data={TestimonialSliderData}  
                pagination={true}
            />

            {/* Featured Blog */}
            <FeaturedBlog2 data={FeaturedBlog2Data} />

            {/* Contact Form */}
            <ContactSection data={Contact2Data} />
        </>
    )
}

export default Home3;