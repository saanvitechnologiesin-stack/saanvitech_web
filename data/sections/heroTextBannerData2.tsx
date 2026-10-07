import { SectionProps } from "@/types/sectionProps";
import ImageDesktop from "@/public/img/slider/hero-3.jpg";
import ImageTablet from "@/public/img/slider/hero-3-991.jpg";
import ImageMobile from "@/public/img/slider/hero-3-575.jpg";

export const HeroTextBannerData2: SectionProps = { 
    wrapperCls: "about-us-2",
    container: "container-fluid",
    heading: "Trusted Advice, Proven Success",
    text: "We guide you with clear, reliable insights backed by real results. Our experienced team delivers strategies you can trust.",
    primaryButton: {
        label: "View Our Services",
        href: "/services"
    },
    secondaryButton: {
        label: "Free Consultation",
        href: "/contact-us"
    },
    image: {
        src: ImageDesktop.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1440,
        alt: "Banner Image",
        loading: "lazy",
        cls: "media media-bg flex overlay"
    }
}