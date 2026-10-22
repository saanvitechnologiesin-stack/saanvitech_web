import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsImage from "@/public/img/why-choose-us/1.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    image: {
        src: WhyChooseUsImage.src,
        width: WhyChooseUsImage.width || 1000,
        height: WhyChooseUsImage.height || 1469,
        loading: "lazy",
        alt: "Why Choose Us"
    },
    subheading: "Why Choose Us",
    heading: "Driving Growth Through Innovation",
    text: "Saanvi Technologies specializes in engineering intelligent, scalable software systems and tailored digital solutions that empower modern enterprises to streamline operations, accelerate digital transformation, and achieve sustainable growth worldwide.",
    button: {
        label: "Discover More",
        href: "/about-us",
        type: "secondary"
    },
    promotions: [
        {
            icon: <Icons.Winning />,
            title: "99% Success <br />Track Record",
            text: "Delivering high-performance, robust, and secure enterprise solutions that consistently exceed client expectations.",
        },
        {
            icon: <Icons.Support />,
            title: "Full Time <br />Dedicated Support",
            text: "Round-the-clock technical support, proactive system monitoring, and seamless maintenance for uninterrupted operations.",
        },
    ],
    counterData: [
        {
            number: 20,
            suffix: "k+",
            title: "Project completed",
            aos: "fade-up",
            aosDelay: 20,
        },
        {
            number: 12,
            suffix: "k+",
            title: "Happy customers",
        },
        {
            number: 25,
            suffix: "+",
            title: "Years experiences",
        },
    ],
}