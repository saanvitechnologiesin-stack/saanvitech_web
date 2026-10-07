import { SectionProps } from "@/types/sectionProps";
import Image1 from '@/public/img/why-choose-us/1.jpg';
import Icons from "@/components/Icons";

export const ourCompanydata: SectionProps = {
    wrapperCls: "mt-100",
    container: "container-fluid",
    subheading: "Our Company",
    heading: "Discover Our Story and What Drives Us",
    text: "We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities.",
    button: {
        label: "More About Us",
        href: "/about-us",
        type: "primary"
    },
    image: {
        src: Image1.src,
        width: 992,
        height: 717,
        alt: 'Image',
        loading: 'lazy'
    },
    rotatingLogo: {
        logo: <Icons.ChooseRotatingLogo />,
        text: "25",
    },
    textList: [
        {
            text: "Integrate a diverse range of ideas"
        },
        {
            text: "Deliver the highest quality outcomes"
        },
        {
            text: "Believe in powerof implication"
        }
    ]
}
