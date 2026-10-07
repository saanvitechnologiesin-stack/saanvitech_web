import { SectionProps } from "@/types/sectionProps";
import ImageCollab from '@/public/img/image-text/pexels-canvastudio-3277806.jpg';
import ImageStrategy from '@/public/img/image-text/pexels-tima-miroshnichenko-7567557.jpg';
import ImageDeveloper from '@/public/img/image-text/pexels-djordje-petrovic-590080-2102416.jpg';

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
        src: ImageDeveloper.src,
        width: ImageDeveloper.width,
        height: ImageDeveloper.height,
        alt: 'Saanvi Technologies Team - Our Company',
        loading: 'lazy'
    },
    imageList: [
        {
            src: ImageCollab.src,
            width: ImageCollab.width,
            height: ImageCollab.height,
            alt: 'Team collaboration and software development',
            loading: 'lazy'
        },
        {
            src: ImageStrategy.src,
            width: ImageStrategy.width,
            height: ImageStrategy.height,
            alt: 'Strategic consulting and financial planning',
            loading: 'lazy'
        },
        {
            src: ImageDeveloper.src,
            width: ImageDeveloper.width,
            height: ImageDeveloper.height,
            alt: 'Software development and IT engineering at Saanvi Technologies',
            cls: 'object-[center_center]',
            loading: 'lazy'
        }
    ],
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
