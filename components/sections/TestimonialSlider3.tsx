'use client';

import { useRef } from 'react';
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


const TestimonialSlider3 = ({
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
       <div className={`testimonial-4 overflow-x-hidden ${wrapperCls}`}>
        <div className={container}>
          <div className="testimonial-inner">
            <div className="grid grid-cols-12 gap-1">
              <div className="lg:col-span-6 col-span-12">
                <div className="heading-wrapper">
                  <div className="section-headings" data-aos="fade-right">
                    {subheading &&
                        <Subheading 
                            title={subheading}
                            cls="text-20"
                        />
                    }

                    {heading &&
                        <Heading 
                            title={heading}
                            cls="text-50"
                        />
                    }
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12">
                 <testicolumn-slider className="team-slider testicolumn-slider" data-aos="fade-left">
                    <Swiper
                        modules={pagination ? [Pagination] : []}
                        pagination={pagination ? { clickable: true } : undefined}
                        spaceBetween={20}
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="swiper"
                    >
                        {testimonialList.map((item, index) => (
                            <SwiperSlide key={`card-testimonial-${index}`}>
                                <CardTestimonial data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </testicolumn-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TestimonialSlider3;