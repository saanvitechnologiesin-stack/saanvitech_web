import "@/styles/running-content.css";
import { SectionProps } from "@/types/sectionProps";
import Link from "next/link";
import Image from "next/image";

const ScrollingTextGradient = ({ data }: { data: SectionProps }) => {
    const {    
        wrapperCls,
        container,
        imageList
    } = data || {};

    return (
        <div className={`running-content ${wrapperCls}`}>
            <div className={container}>
                <div className="content-inner radius18">
                    <div className="logos-background p-2">
                        <div className="content-lists running-animation">
                            {Array.from({ length: 4 }).map((_, i) => (                            
                                <div className="content-item" key={i}>
                                    {imageList && imageList.map((item, index) => (
                                        <Link 
                                            href={item.href ? item.href : ''} 
                                            className="content-link" 
                                            key={`scroll-img-${index}`}
                                        >
                                            <Image
                                                src={item.src}
                                                width={108}
                                                height={36}
                                                loading="lazy"
                                                alt="Brand Image"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ScrollingTextGradient;