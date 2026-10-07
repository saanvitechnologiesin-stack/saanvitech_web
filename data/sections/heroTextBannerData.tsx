import { SectionProps } from "@/types/sectionProps";
import ImageDesktop from "@/public/img/slider/hero-2.jpg";
import ImageTablet from "@/public/img/slider/hero2-991.jpg";
import ImageMobile from "@/public/img/slider/hero2-575.jpg";

export const HeroTextBannerData: SectionProps = { 
    wrapperCls: "mt-100",
    container: "container",
    heading: "Trusted Advice, Proven Success",
    text: "With years of experience and a passion for results, we deliver solutions that work. Trust our expertise to help you build, scale, and succeed.",
    block: {
        subheading: "+",
        heading: "25",
        text: "Years<br/> of experience",
    },
    primaryButton: {
        label: "Free Consultation",
        href: "/contact-us"
    },
    secondaryButton: {
        label: "View Our Services",
        href: "/services"
    },
    image: {
        src: ImageDesktop.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1000,
        alt: "Banner Image",
        loading: "lazy",
        cls: "media media-bg flex"
    }
}