import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/pexels-cottonbro-6804068.jpg";
import Image2 from "@/public/img/project/pexels-gustavo-fring-4872028.jpg";
import Image3 from "@/public/img/project/pexels-thecoachspace-2977547.jpg";

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
            width: Image1.width || 1000,
            height: Image1.height || 595,
            loading: "lazy",
            alt: "Recent Project - Team Collaboration and Planning"
        },
        {
            src: Image2.src,
            width: Image2.width || 500,
            height: Image2.height || 385,
            loading: "lazy",
            alt: "Recent Project - Technical Architecture Discussion"
        },
        {
            src: Image3.src,
            width: Image3.width || 500,
            height: Image3.height || 385,
            loading: "lazy",
            alt: "Recent Project - Business Strategy & Development"
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