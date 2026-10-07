import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/brand/logo.png";
import Image2 from "@/public/img/brand/logo-2.png";

export const ScrollingLargeTextData: SectionProps = {
    wrapperCls: "py-2",
    imageList: [        
        {
            src: Image1.src,
            alt: "Scrolling image",
            width: 128,
            height: 128,
            loading: "lazy",
            title: "Your Journey"
        },
        {
            src: Image1.src,
            alt: "Scrolling image",
            width: 128,
            height: 128,
            loading: "lazy",
            title: "Our Expertise"
        }
    ],
    imageList2: [        
        {
            src: Image2.src,
            alt: "Scrolling image",
            width: 80,
            height: 80,
            loading: "lazy",
            title: "Your Journey"
        },
        {
            src: Image2.src,
            alt: "Scrolling image",
            width: 80,
            height: 80,
            loading: "lazy",
            title: "Our Expertise"
        }
    ]
}
