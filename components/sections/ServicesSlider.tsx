'use client';

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination  } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/team.css";
import "@/styles/our-services.css";
import "@/styles/card-working-process.css";

import { SectionProps } from "@/types/sectionProps";
import ServiceList from "@/data/services.json";
import Heading from "../Heading";
import Subheading from "../Subheading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import CardService2 from "../CardService2";

const ServicesSlider = ({
    data,
    pagination 
}: {
    data: SectionProps;
    pagination: boolean;
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const serviceList = ServiceList;
    if(serviceList.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        button,
    } = data;

    return (
        <div className={`our-services ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">
                            {subheading && 
                                <Subheading 
                                    title={subheading}
                                    cls="text-20 subheading-bg"
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
                    }
                </div>                

                <div className="section-content" data-aos="fade-up">
                    <div className={container}>
                        <service-slider className="service-slider">
                            <Swiper
                                modules={pagination ? [Pagination] : []}
                                pagination={pagination ? { clickable: true } : undefined}
                                breakpoints={{
                                    0: {
                                        spaceBetween: 20,
                                        slidesPerView: 1,
                                    },
                                    575: {
                                        spaceBetween: 20,
                                        slidesPerView: 1.2,
                                    },
                                    768: {
                                        spaceBetween: 20,
                                        slidesPerView: 1.8,
                                    },
                                    992: {
                                        spaceBetween: 20,
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        spaceBetween: 20,
                                        slidesPerView: 2.4,
                                    },
                                }}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                className="swiper"
                            >
                                {serviceList.map((service) => (
                                    <SwiperSlide key={service.id}>
                                        <CardService2 data={service} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </service-slider>                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesSlider;