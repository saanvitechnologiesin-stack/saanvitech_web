import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/brand/b1.png";
import Image2 from "@/public/img/brand/b2.png";
import Image3 from "@/public/img/brand/b3.png";
import Image4 from "@/public/img/brand/b4.png";
import Image5 from "@/public/img/brand/b5.png";

export const ScrollingTextGradientData: SectionProps = {
    wrapperCls: "running-content-bg my-1",
    container: "container-fluid",     
    imageList: [        
        {
            src: Image1.src,
            alt: "Scrolling image",
            width: 108,
            height: 36,
            loading: "lazy",
            href: "/about-us"
        },
        {
            src: Image2.src,
            alt: "Scrolling image",
            width: 108,
            height: 36,
            loading: "lazy",
            href: "/about-us"
        },
        {
            src: Image3.src,
            alt: "Scrolling image",
            width: 108,
            height: 36,
            loading: "lazy",
            href: "/about-us"
        },
        {
            src: Image4.src,
            alt: "Scrolling image",
            width: 108,
            height: 36,
            loading: "lazy",
            href: "/about-us"
        },
        {
            src: Image5.src,
            alt: "Scrolling image",
            width: 108,
            height: 36,
            loading: "lazy",
            href: "/about-us"
        }
    ],
}
