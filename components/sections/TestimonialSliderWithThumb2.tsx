"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "@/styles/testimonial.css";
import { SectionProps } from "@/types/sectionProps";
import Subheading from "../Subheading";
import Heading from "../Heading";
import CardTestimonialContent from "../CardTestimonialContent";
import TestimonialList from "@/data/testimonials.json";
import Image from "next/image";

const TestimonialSliderWithThumb2 = ({ data }: { data: SectionProps }) => {
  const [thumbSwiper, setThumbSwiper] = useState<any>(null);
  const testimonialList = TestimonialList;
  if (testimonialList.length == 0) return null;

  const { wrapperCls, container, subheading, heading } = data || {};

  return (
    <div className={`overflow-x-hidden ${wrapperCls}`}>
      <div className={container}>
        <testimonial-slider className="testimonial-slider testicolumn-slider">
          <div className="grid grid-cols-12 gap-1 product-grid">
            <div className="lg:col-span-6 col-span-12">
              <div className="main-img" data-aos="fade-right">
                <Swiper
                  modules={[Pagination, Thumbs]}
                  thumbs={{ swiper: thumbSwiper }}
                  pagination={{
                    el: ".custom-pagination-thumb-img",
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
            <div className="lg:col-span-6 col-span-12">
              <div
                className="thumb-content-wrapper radius18"
                data-aos="fade-left"
              >
                <div
                  className="section-headings hidden! lg:block!"
                  data-aos="fade-up"
                >
                  {subheading && (
                    <Subheading title={subheading} cls="text-20" />
                  )}

                  {heading && <Heading title={heading} cls="text-50" />}
                </div>
                <div
                  className="thumb-content"
                  data-aos="fade-up"
                  data-aos-dalay="100"
                >
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
  );
};

export default TestimonialSliderWithThumb2;
