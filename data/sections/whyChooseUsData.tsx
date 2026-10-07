import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsImage from "@/public/img/promotion/1.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsData: SectionProps = {
    wrapperCls: "mt-100 section-padding",
    container: "container",
    image: {
        src: WhyChooseUsImage.src,
        width: 1000,
        height: 1469,
        loading: "lazy",
        alt: "Promotion image"
    },
    subheading: "Why Choose Us",
    heading: "Supporting Growth on a Global Scale",
    text: "The solar solution company specializes in providing innovative, eco-friendly energy systems that harness the power, reducing carbon footprints and energy for clients worldwide.",
    button: {
        label: "Discover More",
        href: "/about-us",
        type: "secondary"
    },
    promotions: [
        {
            icon: <Icons.Winning />,
            title: "99% Winning <br />Guarantee",
            text: "The solar solution company specializes innovative.",
        },
        {
            icon: <Icons.Support />,
            title: "Full Time <br />Support",
            text: "The solar solution company specializes innovative.",
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