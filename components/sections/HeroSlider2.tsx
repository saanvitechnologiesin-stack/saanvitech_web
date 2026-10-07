"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "@/styles/hero-banner.css";
import "@/styles/hero-slider.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Icons from "../Icons";
import Image from "next/image";
import { BannerSliderType } from "@/types/bannerSlider";
import { HeroSliderType } from "@/types/heroSlider";

const HeroSlider2 = ({ wrapperCls, slides }: HeroSliderType) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <new-banner className={`hero-slider slider-with-thumb ${wrapperCls}`}>
      <div className="main-slider" data-aos="fade-down">
        <Swiper
          modules={[Thumbs, FreeMode, Autoplay]}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className="slider-card overlay">
                {slide.image && (
                  <picture className="slider-media">
                    {slide.imageMobile && (
                      <source
                        media="(max-width: 575px)"
                        srcSet={slide.imageMobile}
                      />
                    )}
                    {slide.imageTablet && (
                      <source
                        media="(max-width: 991px)"
                        srcSet={slide.imageTablet}
                      />
                    )}
                    <Image
                      src={slide.image}
                      width={1920}
                      height={1000}
                      loading="lazy"
                      alt="Hero image"
                    />
                  </picture>
                )}

                <div className="slider-content">
                  <div className="container-fluid height-100 flex items-center">
                    <div className="content-box slider-animation section-headings">
                      {slide.subheading && (
                        <Subheading title={slide.subheading} cls="text-20" />
                      )}

                      {slide.heading && (
                        <Heading title={slide.heading} cls="text-90 fw-700" />
                      )}

                      {slide.text && <Text text={slide.text} cls="text-18" />}

                      {slide.button && (
                        <div className="buttons">
                          {slide.button.type == "primary" ? (
                            <PrimaryButton
                              label={slide.button.label}
                              href={slide.button.href}
                              ariaLabel="Hero button"
                            />
                          ) : (
                            <SecondaryButton
                              label={slide.button.label}
                              href={slide.button.href}
                              ariaLabel="Hero button"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="container-fluid position-relative">
        <div className="thumb-slider">
          <Swiper
            onSwiper={setThumbsSwiper}
            watchSlidesProgress={true}
            breakpoints={{
              0: {
                spaceBetween: 16,
                slidesPerView: 3,
              },
              575: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
              768: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={`slide-thumb-${index}`}>
                {slide.thumb && (
                  <div className="thumb-img">
                    <Image
                      src={slide.thumb}
                      width={160}
                      height={140}
                      loading="lazy"
                      alt={`Slider thumb image ${index}`}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </new-banner>
  );
};

export default HeroSlider2;
