import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/1.jpg";
import Image2 from "@/public/img/project/2.jpg";
import Image3 from "@/public/img/project/3.jpg";

export const RecentProject2Data: SectionProps = {
    wrapperCls: "mt-100",
    container: "container-fluid",
    link: "/projects",
    subheading: "Recent Projects",
    heading: "Smart Digital Solutions Tailored For growth",
    text: "Saanvi Technologies specializes in delivering innovative, high-performance IT solutions and scalable software systems, driving digital transformation and sustainable growth for clients worldwide.",        
    imageList: [
        {
            src: Image1.src,
            width: 1000,
            height: 595,
            loading: "lazy",
            alt: "Large image"
        },
        {
            src: Image2.src,
            width: 500,
            height: 385,
            loading: "lazy",
            alt: "Small image"
        },
        {
            src: Image3.src,
            width: 500,
            height: 385,
            loading: "lazy",
            alt: "Small image"
        },
    ],
    block: {
        heading: "Unlocking New Opportunities for Sustainable Growth",
        text: "Saanvi Technologies specializes in engineering bespoke software systems and intelligent platforms that empower global enterprises.",
        button: {
            label: "View All Details",
            href: "/projects",
            type: "secondary"
        }
    },
}