import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/1.jpg";
import Image2 from "@/public/img/project/2.jpg";
import Image3 from "@/public/img/project/3.jpg";

export const RecentProjectData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    link: "/projects",
    subheading: "Recent Projects",
    heading: "Explore the Recent Works We Have Done!",
    text: "The solar solution company specializes in providing innovative, eco-friendly energy systems harness the power, reducing carbon footprints and energy for clients worldwide.",        
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
        text: "The solar solution company specializes in providing innovative, eco-friendly energy systems harness the power.",
        button: {
            label: "View All Details",
            href: "/projects",
            type: "secondary"
        }
    },
}