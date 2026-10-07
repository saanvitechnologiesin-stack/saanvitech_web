import { SectionProps } from "@/types/sectionProps";
import Image from "@/public/img/slider/h6.jpg";
import ImageTablet from "@/public/img/slider/h6-991.jpg";
import ImageMobile from "@/public/img/slider/h6-575.jpg";

export const HeroLargeTextBannerData: SectionProps = {
    wrapperCls: "hero-slider-3 height-auto",
    heading: "Grow Your Brand with Consulo",
    styledText: "Consulo",
    styledTextCls: "decorated-text",
    text: "Consulo empowers your brand with proven strategies, creative direction, and data-driven decisions that attract, engage, and convert customers. We combine market insights, innovative thinking, and industry expertise to strengthen your presence, build lasting trust, and drive sustainable business growth.",
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
        height: 1440,
        alt: "Hero image",
        loading: "eager",
        cls: "slider-media"
    }
}
