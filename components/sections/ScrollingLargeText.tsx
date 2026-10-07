import "@/styles/running-content.css";
import { SectionProps } from "@/types/sectionProps";
import React from "react";
import Image from "next/image";

const ScrollingLargeText = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        imageList,
    } = data || {};

    return (
        <div className={`running-content has-large-text ${wrapperCls}`}>
            <div className="content-inner">
                <div className="content-lists running-animation">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="content-item" key={i}>
                            {imageList && imageList.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="heading text-80">{item.title}</div>
                                    <div className="image-logo">
                                        <Image
                                            src={item.src}
                                            width={item.width}
                                            height={item.height}
                                            loading={item.loading}
                                            alt={item.alt ? item.alt : "Brand image"}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default ScrollingLargeText;