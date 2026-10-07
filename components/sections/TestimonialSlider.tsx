'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';

import "@/styles/team.css";
import "@/styles/testimonial.css";
import { SectionProps } from "@/types/sectionProps";
import Subheading from "../Subheading";
import Heading from "../Heading";
import CardTestimonial from "../CardTestimonial";
import TestimonialList from "@/data/testimonials.json";


const TestimonialSlider = ({
    data,
    pagination 
}: {
    data: SectionProps;
    pagination: boolean;
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const testimonialList = TestimonialList;
    if(testimonialList.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
    } = data || {};

    return (
        <testi-slider className={wrapperCls}>
            <div className={container}>
                <div className="section-headings headings-width text-center">
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

                <div className="section-content" data-aos="fade-up">
                    <Swiper
                        modules={pagination ? [Pagination] : []}
                        pagination={pagination ? { clickable: true } : undefined}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 20 },
                            840: { slidesPerView: 2, spaceBetween: 20 },
                            1280: { slidesPerView: 2, spaceBetween: 30 },
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="swiper"
                    >
                        {testimonialList.map((item, index) => (
                            <SwiperSlide key={`card-testimonial-${index}`}>
                                <CardTestimonial data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </testi-slider>
    )
}

export default TestimonialSlider;