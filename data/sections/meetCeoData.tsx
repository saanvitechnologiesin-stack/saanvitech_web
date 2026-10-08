import CeoImage from "@/public/img/team/8.jpg";

export interface MeetCeoDataType {
    wrapperCls?: string;
    container?: string;
    subheading?: string;
    heading?: string;
    image: {
        src: string;
        width: number;
        height: number;
        loading: "lazy" | "eager";
        alt: string;
    };
    name: string;
    designation: string;
    quote: string;
    social: {
        linkedin_url?: string;
        twitter_url?: string;
        instagram_url?: string;
    };
}

export const MeetCeoData: MeetCeoDataType = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Leadership",
    heading: "Meet Our CEO",
    image: {
        src: CeoImage.src,
        width: CeoImage.width || 500,
        height: CeoImage.height || 619,
        loading: "lazy",
        alt: "Ethan Reynolds - CEO & Founder"
    },
    name: "Ethan Reynolds",
    designation: "CEO & Founder",
    quote: "With over 15 years of experience in technology and business consulting, I founded Saanvi Tech with a vision to bridge the gap between innovative technology solutions and real-world business challenges. Our mission is to empower organizations through cutting-edge digital transformation, strategic consulting, and sustainable growth strategies that create lasting impact.",
    social: {
        linkedin_url: "https://linkedin.com",
        twitter_url: "https://x.com",
        instagram_url: "https://instagram.com",
    },
}
