import React from "react";
import "@/styles/image-with-text.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import CardImageText from "../CardImageText";

const StickyBanner = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        heading,
        text,
        blockList,
    } = data || {};

    return (
        <div className={`text-image-sticky ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal align-items-start overflow-hidden">
                    {heading &&
                        <div className="section-headings-left">
                            <Heading 
                                title={heading}
                                cls="text-50"
                                aos="fade-right"
                            />
                        </div>
                    }

                    {text &&
                        <div
                            className="section-headings-right text text-18"
                            data-aos="fade-left"
                        >
                            {text}
                        </div>
                    }
                </div>

                {blockList &&
                    <div className="section-content">
                        {blockList.map((item, index) => (
                            <React.Fragment key={`block-${index}`}>
                                <CardImageText data={item} />
                            </React.Fragment>
                        ))}
                    </div>
                }              
            </div>
        </div>
    )
}

export default StickyBanner;