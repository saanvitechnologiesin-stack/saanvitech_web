"use client";

import "@/styles/running-content.css";
import { SectionProps } from "@/types/sectionProps";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Link from "next/link";
import Image from "next/image";

const ScrollingText = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        imageList,
    } = data || {};

    if (!imageList || imageList.length === 0) return null;

    // Duplicate list for seamless infinite loop (0% to -50%)
    const marqueeList = [...imageList, ...imageList];

    return (
        <div className={`running-content ${wrapperCls}`}>
            <div className={container}>
                {(subheading || heading) && (
                    <div className="section-headings text-center mb-24" data-aos="fade-up">
                        {subheading && (
                            <Subheading 
                                title={subheading}
                                cls="text-20"
                                aos="fade-up"
                            />
                        )}
                        {heading && (
                            <Heading 
                                title={heading} 
                                cls="text-40" 
                                aos="fade-up" 
                            />
                        )}
                    </div>
                )}
                <div className="content-inner marquee-seamless-wrapper">
                    <div className="content-lists running-animation">
                        {marqueeList.map((item, index) => (
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
                                    alt={item.alt ? item.alt : "Partner logo"}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollingText;