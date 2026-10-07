'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import "@/styles/testimonial.css";
import { SectionProps } from "@/types/sectionProps";
import Subheading from "../Subheading";
import Heading from "../Heading";
import CardTestimonialContent from "../CardTestimonialContent";
import TestimonialList from "@/data/testimonials.json";
import Image from 'next/image';


const TestimonialSliderWithThumb = ({ data }: { data: SectionProps;}) => {
    const [thumbSwiper, setThumbSwiper] = useState<any>(null);
    const testimonialList = TestimonialList;
    if(testimonialList.length == 0) return null;

    const {
        wrapperCls,
        container,
        backgroundImage,
        subheading,
        heading,
    } = data || {};

    return (
        <div className={wrapperCls}>
            {backgroundImage &&
                <div className="media media-bg">
                    <Image
                        src={backgroundImage.src}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        loading={backgroundImage.loading}
                        alt={backgroundImage.alt ? backgroundImage.alt : 'Background image'}
                    />
                </div>
            }

            <div className={`section-padding ${container}`}>
                <div className="section-headings lg:hidden">
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

                <testimonial-slider className="testimonial-slider">
                    <div className="grid grid-cols-2 lg:gap-1">
                        <div className="lg:col-span-1 col-span-2">
                            <div className="main-img">
                                <Swiper
                                    modules={[Pagination, Thumbs]}
                                    thumbs={{ swiper: thumbSwiper }}
                                    pagination={{
                                        el: '.custom-pagination-thumb-img',
                                        clickable: true,
                                        renderBullet: (index, className) =>
                                        `<div class="${className} custom-bullet"><img src="${testimonialList[index].image}" alt="thumb-${index}" /></div>`,
                                    }}
                                    className="swiper"
                                >
                                    {testimonialList.map((item, index) => (
                                        <SwiperSlide key={`testimonial-main-${index}`}>
                                            <div className="main-img radius18">
                                                <Image 
                                                    src={item.image}
                                                    width={1000} 
                                                    height={1096} 
                                                    loading="lazy" 
                                                    alt="main image" 
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="swiper-pagination custom-pagination-thumb-img"></div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 col-span-2">
                            <div className="thumb-content-wrapper">
                                <div className="section-headings hidden lg:block">
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

                                <div className="thumb-content">
                                    <Swiper
                                        modules={[Thumbs]}
                                        onSwiper={setThumbSwiper}
                                        watchSlidesProgress
                                        allowTouchMove={true}
                                        className="swiper"
                                    >
                                        {testimonialList.map((item, index) => (
                                            <SwiperSlide key={`testimonial-content-${index}`}>
                                                <CardTestimonialContent data={item} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </testimonial-slider>
            </div>
        </div>
    )
}

export default TestimonialSliderWithThumb;