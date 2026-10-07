import { SectionProps } from "@/types/sectionProps";
import ImageDesktop from '@/public/img/slider/hero-2.jpg';
import ImageTablet from '@/public/img/slider/hero2-991.jpg';
import ImageMobile from '@/public/img/slider/hero2-575.jpg';

export const HeroBannerHorizontalData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    heading: "Trusted Advice, Proven Success",
    text: "With years of experience and a passion for results, we deliver solutions that work. Trust our expertise to help you build, scale, and succeed.",
    image: {
        src: ImageDesktop.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1000,
        alt: 'Image',
        loading: 'lazy',        
        cls:'media media-bg flex overlay',
    },
    block: {
        heading: '25',
        headingSup: '+',
        text: 'Years <br/> of experience',
        button: {
            label: 'Free Consultation',
            href: '/contact-us',
            ariaLabel: 'hero button',
            showIcon: true,
            type: 'primary'
        },
        button2: {
            label: 'View Our Services',
            href: '/services',
            ariaLabel: 'hero button',
            showIcon: true,
            type: 'secondary'
        },
    }
}
