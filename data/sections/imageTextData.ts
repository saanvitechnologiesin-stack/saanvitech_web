import { SectionProps } from "@/types/sectionProps";
import Image1 from '@/public/img/image-text/img1.png';

export const ImageTextData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Our Company",
    heading: "Redesigning business for solutions",
    text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
    button: {
        label: "More About Us",
        href: "/contact-us",
        type: "primary"
    },
    image: {
        src: Image1.src,
        width: 992,
        height: 863,
        alt: 'Image',
        loading: 'lazy'
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
