import { SectionProps } from "@/types/sectionProps";
import ImageCollab from '@/public/img/image-text/pexels-canvastudio-3277806.jpg';
import ImageStrategy from '@/public/img/image-text/pexels-tima-miroshnichenko-7567557.jpg';
import ImageDeveloper from '@/public/img/image-text/pexels-djordje-petrovic-590080-2102416.jpg';

export const ImageTextData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Our Core values",
    heading: "Driven by a passion for excellence and innovation",
    text: "At Saanvi Technologies, we are driven by a passion for excellence and innovation. Our team of technology enthusiasts is committed to delivering reliable, scalable, and tailored IT solutions that empower businesses to grow and succeed in a competitive digital landscape.",
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
            text: " Innovation – Embracing fresh ideas and advanced technology"
        },
        {
            text: " Modernization – Adapting to the latest industry trends"
        },
        {
            text: " Endurance – Long-term support and reliable performance"
        },
        {
            text: " Integrity – Honest, transparent, and ethical practices"
        },
        {
            text: " Client Focus – Exceeding expectations with dedication"
        },
        {
            text: " Understanding – Listening and delivering what matters"
        }
    ]
}
