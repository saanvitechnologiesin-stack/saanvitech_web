import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsImage from "@/public/img/service/secvice-contact.jpg";

export const WhyChooseUsData4: SectionProps = {
    wrapperCls: "why-choose-video",
    container: "container",
    image: {
        src: WhyChooseUsImage.src,
        width: 1000,
        height: 929,
        loading: "lazy",
        alt: "image"
    },
    subheading: "Why Choose Us",
    heading: "Solutions tailored to your business needs",
    button: {
        label: "Discover More",
        href: "/about-us",
        type: "secondary"
    },
    promotions: [
        {
            title: "Excellence In Action",
            text: "Turning high standards into consistent, measurable business results",
        },
        {
            title: "Proven Track Record",
            text: "Demonstrated success through consistent performance and results",
        },
        {
            title: "Driven By Results",
            text: "Focused on delivering measurable outcomes that grow your business",
        },
    ],
}