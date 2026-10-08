import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/pexels-cottonbro-6804068.jpg";
import Image2 from "@/public/img/project/pexels-gustavo-fring-4872028.jpg";
import Image3 from "@/public/img/project/pexels-thecoachspace-2977547.jpg";

export const RecentProjectData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    link: "/projects",  
    heading: "Smart Digital Solutions Tailored For growth",
    text: "We’re dedicated to solving your most pressing business challenges. Our expert team offers strategic insights and hands-on support to propel your success. Whether you’re looking to overcome obstacles or achieve ambitious goals, we’re here to guide you every step of the way.",        
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
        heading: "5+ Years Experience",
        textList: [
            { text: "We have Leading Edge Technology" },
            { text: "High Standard Candidate" },
            { text: "We have Professional Developers" },
            { text: "Specialist In Mobile & Web Development" }
        ],
        button: {
            label: "View All Details",
            href: "/projects",
            type: "secondary"
        }
    },
}