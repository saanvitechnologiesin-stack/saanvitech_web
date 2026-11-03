import CeoImage from "@/public/img/team/chinmaya-bairy-hq.png";

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
    bio: string;
    visionTitle?: string;
    visionText?: string;
    brochureUrl?: string;
    social: {
        linkedin_url?: string;
        instagram_url?: string;
    };
    stats?: Array<{
        value: string;
        label: string;
    }>;
}

export const MeetCeoData: MeetCeoDataType = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Leadership",
    heading: "Meet Our Founder & CEO",
    image: {
        src: CeoImage.src,
        width: CeoImage.width || 568,
        height: CeoImage.height || 568,
        loading: "lazy",
        alt: "Chinmaya Bairy - Entrepreneur and Founder of Saanvi Technologies"
    },
    name: "Chinmaya Bairy",
    designation: "Entrepreneur and Founder of Saanvi Technologies",
    bio: "Chinmaya Bairy, an alumnus of BMSIT College, is a dynamic entrepreneur who founded Saanvi Technologies in 2023. Saanvi Technologies is a service-based company renowned for being one of the top placement agency service providers, catering to a wide range of clients across various industries. The company's core services include contract staffing, contract-to-hire staffing, recruitment process outsourcing (RPO), along with website development, software development, and mobile application development. Under his leadership, the company has grown rapidly and currently employs over 70+ professionals, achieving an impressive annual turnover of 8+ crores. In addition to Saanvi Technologies, Chinmaya Bairy also leads another venture, Zeeglo Software Pvt. Ltd., a software development company focused on building scalable, intelligent digital solutions for modern businesses. Chinmaya’s path from a student at BMSIT College to a successful entrepreneur serves as an inspiration to aspiring innovators and business leaders.",
    visionTitle: "Vision & Leadership",
    visionText: "Chinmaya Bairy believes in combining technology, innovation, and strategic workforce solutions to empower businesses and create new opportunities for growth. His leadership style focuses on continuous learning, teamwork, customer satisfaction, and long-term business development. Through dedication, innovation, and entrepreneurial excellence, he continues to inspire young professionals and aspiring entrepreneurs to pursue their goals with confidence and determination.",
    brochureUrl: "/broucher/Brochure.pdf",
    social: {
        linkedin_url: "https://www.linkedin.com/in/chinmaya-bairy-51769866",
        instagram_url: "https://www.instagram.com/saanvi__technologies",
    },
    stats: [
        { value: "70+", label: "Professionals" },
        { value: "8+ Cr", label: "Turnover" },
        { value: "2023", label: "Founded" },
    ]
};
