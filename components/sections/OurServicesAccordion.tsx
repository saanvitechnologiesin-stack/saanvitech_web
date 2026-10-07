'use client';

import "@/styles/accordion.css";
import "@/styles/our-services.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import { SectionProps } from "@/types/sectionProps";
import AccordionHorizontal from "../AccordionHorizontal";

const OurServicesAccordion = ({ data }: { data: SectionProps }) => {
    const serviceList = ServiceList;
    if(serviceList.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        button
    } = data || {};

    return (
        <div className={`our-services ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">
                        {subheading && 
                            <Subheading 
                                title={subheading}
                                cls="text-20"
                                aos="fade-right"
                            />
                        }

                        {heading && 
                            <Heading 
                                title={heading}
                                cls="text-50"
                                aos="fade-right"
                            />
                        }
                    </div>

                    {button && 
                        <div 
                            className="section-headings-right buttons" 
                            data-aos="fade-left"
                        >
                            <div className="buttons" data-aos="fade-up">
                                {button.type == 'primary' &&
                                    <PrimaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }

                                {button.type == 'secondary' &&
                                    <SecondaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }
                            </div>
                        </div>
                    }
                </div>

                <div className="section-content" data-aos="fade-up">
                    <AccordionHorizontal items={serviceList} />
                </div>
            </div>
        </div>
    )
}

export default OurServicesAccordion;