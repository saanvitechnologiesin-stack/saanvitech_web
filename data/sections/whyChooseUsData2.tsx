import { SectionProps } from "@/types/sectionProps";
import backgroundImage from "@/public/img/why-choose-us/1.jpg";
import Image from "@/public/img/service/secvice-contact.jpg";
import Icons from "@/components/Icons";

export const WhyChooseUsData2: SectionProps = {
    wrapperCls: "mt-100",
    backgroundImage: {
        src: backgroundImage.src,
        width: 1000,
        height: 742,
        loading: "lazy",
        alt: "image"
    },
    image: {
        src: Image.src,
        width: 1000,
        height: 742,
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
            icon: <Icons.Mission />,
            title: "Our Mission",
            text: "Our mission is push engage boundaries, enga audiences, and driv engage.",
        },
        {
            icon: <Icons.Vision />,
            title: "Our Vision",
            text: "We aim to shape a future where bold ideas and smart strategy drive lasting success.",
        },
        {
            icon: <Icons.Awards />,
            title: "Our Awards",
            text: "Each award celebrates our commitment to impactful ideas, quality work, and outstanding performance.",
        },
        {
            icon: <Icons.Ambition />,
            title: "Our ambition",
            text: "Our ambition is to set new standards, inspire innovation, and help brands achieve meaningful success.",
        }
    ],
}