import { SectionProps } from "@/types/sectionProps";
import ImageDesktop from "@/public/img/slider/hero-2.jpg";
import ImageTablet from "@/public/img/slider/hero2-991.jpg";
import ImageMobile from "@/public/img/slider/hero2-575.jpg";

export const AboutData: SectionProps = {
    container: "container-fluid",
    subheading: "Questions",
    heading: "Our story, our mission that make us different",
    text: "Saanvi Technologies specializes in delivering innovative, high-performance IT solutions and scalable software systems, driving digital transformation and sustainable growth for clients worldwide.",
    button: {
        label: "Learn More About Us",
        href: "/about-us",
        type: "primary"
    },
    image: {
        src: ImageDesktop.src,
        srcTablet: ImageTablet.src,
        srcMobile: ImageMobile.src,
        width: 1920,
        height: 1000,
        alt: "Image",
        loading: "lazy",
    }
}
