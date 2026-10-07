import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/1.jpg";
import Image2 from "@/public/img/project/2.jpg";
import Image3 from "@/public/img/project/3.jpg";

export const StickyBannerData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    heading: "Explore the Recent Works We Have Done!",
    text: "The solar solution company specializes in providing innovative, eco-friendly energy systems harness the power, reducing carbon footprints and energy for clients worldwide.",
    blockList: [
        {
            subheading: "Investment Idea",
            heading: "Innovation meets business needs",
            text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",    
            button: {
                label: "Learn More",
                href: "/projects",
                type: "primary"
            },
            image: {
                src: Image1.src,
                width: 1000,
                height: 707,
                loading: "lazy",
                alt: "Image",
            },
        },
        {
            subheading: "Risk Management",
            heading: "Protecting business from uncertainty",
            text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",    
            button: {
                label: "Learn More",
                href: "/projects",
                type: "primary"
            },
            image: {
                src: Image2.src,
                width: 1000,
                height: 707,
                loading: "lazy",
                alt: "Image",
            },
        },
        {
            subheading: "Business Growth",
            heading: "Redesigning business for solutions",
            text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",    
            button: {
                label: "Learn More",
                href: "/projects",
                type: "primary"
            },
            image: {
                src: Image3.src,
                width: 1000,
                height: 707,
                loading: "lazy",
                alt: "Image",
            },
        }
    ]
}
