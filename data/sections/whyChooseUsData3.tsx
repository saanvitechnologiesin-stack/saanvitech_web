import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsImage from "@/public/img/promotion/1.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsData3: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    image: {
        src: WhyChooseUsImage.src,
        width: 1000,
        height: 1469,
        loading: "lazy",
        alt: "Promotion image"
    },
    subheading: "Why Choose Us",
    heading: "Excellence You Can Trust",
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
            text: "A proven record of completing projects on time and with excellence, reflecting our dedication and expertise.",
            aos: "fade-up",
        },
        {
            number: 12,
            suffix: "k+",
            title: "Happy customers",
            text: "A proven record of completing projects on time and with excellence, reflecting our dedication and expertise.",
            aos: "fade-up",
            aosDelay: 50,
        },
        {
            number: 25,
            suffix: "+",
            title: "Years experiences",
            text: "A proven record of completing projects on time and with excellence, reflecting our dedication and expertise.",
            aos: "fade-up",
            aosDelay: 100,
        },
    ],
}