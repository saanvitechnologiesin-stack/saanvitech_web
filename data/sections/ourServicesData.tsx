import { SectionProps } from "@/types/sectionProps";
import BackgroundImage from '@/public/img/contact/contact-bg.jpg';

export const OurServicesData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    backgroundImage: {
        src: BackgroundImage.src,
        width: 1920,
        height: 883,
        alt: "Service background image",
        loading: "lazy"
    },
    subheading: "Our Services",
    heading: "Grow client base to boost business",
    button: {
        label: "More Services",
        href: "/services",
        type: "primary"
    },
}