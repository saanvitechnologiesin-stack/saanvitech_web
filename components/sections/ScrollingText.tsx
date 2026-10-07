import "@/styles/running-content.css";
import { SectionProps } from "@/types/sectionProps";
import Link from "next/link";
import Image from "next/image";

const ScrollingText = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        imageList,
    } = data || {};

    return (
        <div className={`running-content ${wrapperCls}`}>
            <div className={container}>
                <div className="content-inner">
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
                                            width={item.width}
                                            height={item.height}
                                            loading={item.loading}
                                            alt={item.alt ? item.alt : "Brand image"}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ScrollingText;