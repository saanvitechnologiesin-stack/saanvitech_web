import { SectionProps } from "@/types/sectionProps";
import BackgroundImage from "@/public/img/slider/slider-bg.jpg"

export const PricingPlan2Data: SectionProps = {
    wrapperCls: "pricing-plan-page mt-100 section-padding",
    container: "container",
    subheading: "Pricing Plan",
    heading: "Choose Your Perfect Plans",
    backgroundImage: {
        src: BackgroundImage.src,
        width: 1920,
        height: 1000,
        alt: "Background image",
        loading: "lazy",
    }
}