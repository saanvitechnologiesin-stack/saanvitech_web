'use client';

import "@/styles/multicolumn.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import CardService from "../CardService";
import { SectionProps } from "@/types/sectionProps";

const OurServicesSix = ({ data }: { data: SectionProps }) => {
    const serviceList = ServiceList;
    if(serviceList.length == 0) return null;

    const {
        container,
        subheading,
        heading,
        button
    } = data || {};

    return (
        <div className={`multicolumn multicolumn-page section-padding`}>
            <div className={container}>
                <div className="multicolumn-header section-headings">
                    {subheading && 
                        <Subheading 
                            title={subheading}
                            cls="text-20"
                            aos="fade-up"
                        />
                    }

                    {heading && 
                        <Heading 
                            title={heading}
                            cls="text-50"
                            aos="fade-up"
                        />
                    }
                </div>

                <div className="multicolumn-inner section-content">
                    <div className="grid grid-cols-12 product-grid md:gap-1">
                        {serviceList.slice(0, 6).map((service) => (
                            <div 
                                className="xl:col-span-4 md:col-span-6 col-span-12" 
                                data-aos="fade-up" 
                                key={`servicel-card-${service.id}`}
                            >
                                <CardService data={service} />
                            </div>
                        ))}
                    </div>
                </div>

                {button && 
                    <div className="section-headings text-center">
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
        </div>
    )
}

export default OurServicesSix;