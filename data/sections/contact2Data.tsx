import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const Contact2Data: SectionProps = {
    wrapperCls: "section-padding without-box-shadow",
    container: "container",
    subheading: "Contact Us",
    heading: "Let's Build an Awesome Project Together",
    text: "Each demo built with Teba will look different. You can customize almost anything in the appearance of your website with only a few clicks. Each demo built with Teba will look different.",
    promotions: [
        {
            icon: <Icons.ThumbsUp />,
            title: "350+ Projects Done",
            text: "From banking and insurance to wealth the management and security on there",
        },
        {
            icon: <Icons.Support />,
            title: "500+ Happy Clients",
            text: "From banking and insurance to wealth the management and security on there",
        },
    ],
    block: {
        heading: "Make an Appointment",
        text: "Feel free to contact with us, we don't spam your email",
    },
}