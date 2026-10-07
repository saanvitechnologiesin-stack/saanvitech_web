import { SectionProps } from "@/types/sectionProps";
import Image from "@/public/img/slider/h4.jpg";
import ImageTablet from "@/public/img/slider/h4-991.jpg";
import ImageMobile from "@/public/img/slider/h4-575.jpg";

export const HeroBannerButtonData: SectionProps = {
    wrapperCls: "hero-slider-3 with-floating-header with-fixed-bg",
    heading: "Build Brand And Grow Business With Consulo",
    styledText: "Consulo",
    styledTextCls: "heading-color fw-700",
    text: "We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities. Transform your business with our expert consultancy services.",
    primaryButton: {
        label: "Free Consultation",
        href: "/contact-us"
    },
    secondaryButton: {
        label: "View Our Services",
        href: "/services"
    },
    image: {
        src: Image.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1000,
        alt: "Hero image",
        loading: "eager",
        cls: "slider-media"
    }
}
