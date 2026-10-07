import { SectionProps } from "@/types/sectionProps";
import posterImage from "@/public/img/banner/page-banner.jpg"

export const HeroVideoBannerData: SectionProps = { 
    wrapperCls: "hero-video",
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
        src: posterImage.src,
    },
}