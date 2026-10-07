import { BannerSliderType } from "@/types/bannerSlider";
import { BannerSlides } from '@/data/sections/heroSliderData';
import BannerSliderImage from "@/public/img/slider/slider-bg.jpg";

export const BannerWithSliderData: BannerSliderType = {
    wrapperCls: "with-floating-header",
    backgroundImage: BannerSliderImage.src,
    subheading: "Expert Consulting",
    heading: "Steering Your Business Toward Success",
    styledText: "Business",
    text: "We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities.",
    phone: "(307) 555-0133",
    button: {
        label: "Get Started",
        href: "/services",
        type: "primary"
    },
    logoIconName: "LogoRotate",
    slides: BannerSlides,
    navigation: true,
}
