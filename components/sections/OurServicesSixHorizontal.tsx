'use client';

import "@/styles/multicolumn.css";
import "@/styles/our-services.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import CardService from "../CardService";
import { SectionProps } from "@/types/sectionProps";

const OurServicesSixHorizontal = ({ data }: { data: SectionProps }) => {
    const serviceList = ServiceList;
    if(serviceList.length == 0) return null;

    const {
        subheading,
        heading,
        button
    } = data || {};

    return (
        <div className={`our-services our-services-2 mt-100`}>
            <div className="container-fluid">
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
                            data-aos-delay="20"
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

                <div className="section-content multicolumn">
                    <div className="grid grid-cols-12 gap-1 product-grid">
                        {serviceList.slice(0, 1).map((service) => (
                            <div 
                                className="col-span-12 xl:col-span-6" 
                                data-aos="fade-up" 
                                key={`servicel-card-${service.id}`}
                            >
                                <CardService data={service} />
                            </div>
                        ))}
                        {serviceList.slice(1, 5).map((service) => (
                            <div 
                                className="col-span-12 md:col-span-6 xl:col-span-3" 
                                data-aos="fade-up" 
                                key={`servicel-card-${service.id}`}
                            >
                                <CardService data={service} />
                            </div>
                        ))}
                        {serviceList.slice(5, 6).map((service) => (
                            <div 
                                className="col-span-12 xl:col-span-6" 
                                data-aos="fade-up" 
                                key={`servicel-card-${service.id}`}
                            >
                                <CardService data={service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServicesSixHorizontal;