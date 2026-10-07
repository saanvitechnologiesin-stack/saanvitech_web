import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";
import Image1 from '@/public/img/image-text/img2.png';
import Image2 from '@/public/img/image-text/img-small.png';

export const ImageText2Data: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Our Company",
    heading: "Redesigning business for solutions",
    text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
    textList: [
        {
            icon: <Icons.Ambition />,
            title: "Our ambition",
            text: "Businesses off all size thrive in an our businesses."
        },
        {
            icon: <Icons.Purpose />,
            title: "Our purpose",
            text: "Businesses off all size thrive in an our businesses."
        }
    ],
    button: {
        label: "More About Us",
        href: "/about-us",
        type: "primary"
    },
    imageList: [
        {
            src: Image1.src,
            width: 992,
            height: 863,
            alt: 'Image',
            loading: 'lazy'
        },
        {
            src: Image2.src,
            width: 195,
            height: 202,
            alt: 'Image',
            loading: 'lazy'
        }
    ]
}
