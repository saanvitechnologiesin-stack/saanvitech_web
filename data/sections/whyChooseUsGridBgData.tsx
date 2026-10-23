import { SectionProps } from "@/types/sectionProps";
import WhyChooseUsBg from "@/public/img/why-choose-us/bg.jpg";
import WhyChooseUsImage from "@/public/img/why-choose-us/1.jpg";
import WhyChooseUsImageMobile from "@/public/img/why-choose-us/575.jpg";
import PromoImage from "@/public/img/why-choose-us/why_choose_us_promo.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsGridBgData: SectionProps = {
    wrapperCls: "!bg-transparent mt-100 section-padding",
    container: "container",
    backgroundImage: {
        src: WhyChooseUsBg.src,
        width: 1920,
        height: 887,
        loading: "lazy",
        alt: "Background image"
    },
    image: {
        src: WhyChooseUsImage.src,
        srcMobile: WhyChooseUsImage.src,
        width: 1000,
        height: 742,
        loading: "lazy",
        alt: "Choose us image"
    },
    subheading: "Why Choose Us",
    heading: "Driving Growth Through Innovation",
    text: "We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities.",
    button: {
        label: "More About Us",
        href: "/about-us",
        type: "primary"
    },
    rotatingLogo: {
        logo: <Icons.ChooseRotatingLogo />,
        text: "5+",
    },
    promotions: [
        {
            icon: <Icons.Vision />,
            title: "Our Vision",
            text: "To be the preferred global partner in delivering top-tier staffing solutions that empower organizations to build exceptional teams. Through our expertise in software development, we aim to create innovative and scalable solutions that drive business success.",
        },
        {
            icon: <Icons.Mission />,
            title: "Our Mission",
            text: "Our mission is to deliver exceptional staffing solutions that help organizations build high-performing teams. We are dedicated to creating innovative software that drives efficiency and growth for our clients. Through our IT consultancy services, we aim to provide strategic guidance.",
        },
        {
            icon: <Icons.Consulting />,
            title: "COMPREHENSIVE EXPERTISE",
            text: "Our team brings diverse experience across IT consulting, development, and staffing to deliver complete solutions.",
        },
        {
            icon: <Icons.Development />,
            title: "INNOVATIVE SOLUTIONS",
            text: "We craft forward-thinking digital strategies that solve real business challenges and drive measurable growth.",
        },
        {
            icon: <Icons.Strategy />,
            title: "TAILORED APPROACH",
            text: "We customize every solution to fit your unique business goals, ensuring maximum impact and efficiency.",
        },
        {
            icon: <Icons.Clients />,
            title: "CLIENT-CENTRIC SERVICE",
            text: "We prioritize your needs at every step, delivering responsive support and solutions aligned with your vision.",
        },
    ],
    promoImage: {
        src: PromoImage.src,
        width: 800,
        height: 834,
        loading: "lazy",
        alt: "Choose us image"
    },
}