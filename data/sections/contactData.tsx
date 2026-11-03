import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const ContactData: SectionProps = {
    wrapperCls: "section-padding",
    container: "container",
    subheading: "Contact Us",
    heading: "Let's Build an Awesome Project Together",
    text: "Reach out to Saanvi Technologies for software development, IT consulting, and staffing solutions. We look forward to partnering with you.",
    promotions: [
        {
            icon: <Icons.ThumbsUp />,
            title: "Head Office Address",
            text: "Anugraha, H No 3/68, Main Road, NH66, Saligrama - 576225, Brahmavara Taluk, Udupi District",
        },
        {
            icon: <Icons.Support />,
            title: "Get in Touch",
            text: "Phone: +91 84316 07569 | Email: info@saanvitechin.com / chinmaya@saanvitechin.com",
        },
    ],
    block: {
        heading: "Make an Appointment",
        text: "Feel free to contact us anytime. We respond promptly.",
    },
}