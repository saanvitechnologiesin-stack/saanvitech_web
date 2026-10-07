"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/hero-slider.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Icons from "../Icons";
import Image from "next/image";
import { HeroSliderType } from "@/types/heroSlider";

const HeroSlider = ({
    wrapperCls,
    slides,
    navigation
}: HeroSliderType) => {
    // Refs for custom navigation buttons
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    // Attach navigation after both swiper and refs are ready
    useEffect(() => {
        if (
            swiperInstance &&
            prevRef.current &&
            nextRef.current &&
            swiperInstance.params.navigation
        ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiperInstance.params.navigation.prevEl = prevRef.current;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    return (
        <hero-slider className={`hero-slider ${wrapperCls}`}>
            <Swiper
                slidesPerView={1}
                loop={true}
                modules={[Navigation]}
                onSwiper={setSwiperInstance}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={`slide-${index}`}>
                        <div className="slider-card overlay">
                            {slide.image && 
                                <picture className="slider-media">
                                    {slide.imageMobile && <source media="(max-width: 575px)" srcSet={slide.imageMobile} />}
                                    {slide.imageTablet && <source media="(max-width: 991px)" srcSet={slide.imageTablet} />}
                                    <Image
                                        src={slide.image}
                                        width={1920}
                                        height={1000}
                                        loading="lazy"
                                        alt="Hero image"
                                    />
                                </picture>
                            }

                            <div className="slider-content">
                                <div className="container height-100 flex items-center">
                                    <div className="content-box slider-animation section-headings">
                                        {slide.subheading && 
                                            <Subheading 
                                                title={slide.subheading}
                                                cls="text-20"
                                            />
                                        }

                                        {slide.heading && 
                                            <Heading 
                                                title={slide.heading}
                                                cls="text-90 fw-700"
                                            />
                                        }

                                        {slide.text && 
                                            <Text 
                                                text={slide.text}
                                                cls="text-18"
                                            />
                                        }

                                        {slide.button && 
                                            <div className="buttons">
                                                {slide.button.type == 'primary' ? (
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
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>            

            {navigation && 
                <div className="slider-nav">
                    <div className="swiper-button-prev" ref={prevRef}>
                        <Icons.SliderNavPrev />
                    </div>
                    <div className="swiper-button-next" ref={nextRef}>
                        <Icons.SliderNavNext />
                    </div>
                </div>
            }
      </hero-slider>
    )
}

export default HeroSlider;