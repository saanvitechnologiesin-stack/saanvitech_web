import { SectionProps } from "@/types/sectionProps";
import BackgroundImage from '@/public/img/contact/contact-bg.jpg';

export const TestimonialSliderThumbData: SectionProps = {
    wrapperCls: "testimonial-2 mt-100",
    container: "container",
    subheading: "Testimonial",
    heading: "Reviews from our customers",
    backgroundImage: {
        src: BackgroundImage.src,
        width: 1920,
        height: 883,
        alt: "Background image",
        loading: "lazy"
    },
}