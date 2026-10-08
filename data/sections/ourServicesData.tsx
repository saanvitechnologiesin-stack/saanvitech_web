import { SectionProps } from "@/types/sectionProps";
import BackgroundImage from '@/public/img/contact/contact-bg.jpg';

export const OurServicesData: SectionProps = {
    wrapperCls: "section-padding",
    container: "container",
    backgroundImage: {
        src: BackgroundImage.src,
        width: 1920,
        height: 883,
        alt: "Service background image",
        loading: "lazy"
    },
    subheading: "What We Offer",
    heading: "Service We Provide",
    text: "We strive to deliver innovative web, mobile, and software solutions that are perfectly suited for projects of any size, tailored to meet your unique development and consultancy needs",
}