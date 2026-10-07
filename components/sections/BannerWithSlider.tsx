"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "@/styles/hero-banner.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Icons from "../Icons";
import Image from "next/image";
import Link from "next/link";
import { BannerSliderType } from "@/types/bannerSlider";

const BannerWithSlider = ({ data }: { data: BannerSliderType }) => {
    const {
        wrapperCls,
        backgroundImage,
        subheading,
        heading,
        styledText,
        text,
        button,
        phone,
        logoIconName,
        slides,
        navigation
    } = data || {};
    
    const LogoIcon = logoIconName ? Icons[logoIconName] : null;

    // Swiper refs
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
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
        <div className={`hero-banner ${wrapperCls}`}>
            <div className="media media-bg">
                <Image
                    src={backgroundImage}
                    alt="slider background"
                    width={1920}
                    height={1000}
                    loading="eager"
                />
            </div>
            <div className="container-fluid">
                <div className="grid grid-cols-2 items-center lg:gap-1">
                    <div className="lg:col-span-1 col-span-2">
                        <div className="content section-headings">
                            {subheading && 
                                <Subheading 
                                    title={subheading}
                                    cls="text-20"
                                />
                            }

                            {heading &&
                                <Heading 
                                    title={heading}
                                    styledText={styledText}
                                    styledTextCls="decorated-text"
                                    cls="text-80 fw-700"
                                    aos="fade-up"
                                    aosDelay="100"
                                />
                            }

                            {text && 
                                <Text 
                                    text={text}
                                    cls="text-18"
                                    aos="fade-up"
                                    aosDelay="150"
                                />
                            }

                            <div
                                className="hero-button-wrap buttons"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {button && button.type == 'primary' &&
                                    <PrimaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }

                                {button && button.type == 'secondary' &&
                                    <SecondaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }

                                {phone && 
                                    <Link
                                        href={`tel:${phone}`}
                                        className="hero-phone-call"
                                        aria-label="Phone number"
                                        data-aos="fade-up"
                                        data-aos-delay="50"
                                    >
                                        <Icons.PhoneLarge />
                                        <div className="hero-call">
                                            <div className="text text-14">Need help?</div>
                                            <div className="text text-16">{phone}</div>
                                        </div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 col-span-2">
                        <banner-slider className="banner-slider">
                            {LogoIcon &&
                                <div 
                                    className="banner-badge svg-wrapper infinite-rotate" data-aos="fade-right"
                                >
                                    <LogoIcon />
                                </div>
                            }

                            <div className="main-slider" data-aos="fade-down">
                                <Swiper
                                    modules={[Thumbs, FreeMode, Navigation]}
                                    slidesPerView={1}
                                    thumbs={{ swiper: thumbsSwiper }}
                                >
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={`slide-main-${index}`}>
                                            {slide.image &&
                                                <div className="main-img">
                                                    <Image
                                                        src={slide.image}
                                                        width={992}
                                                        height={717}
                                                        loading="lazy"
                                                        alt={`Slider image ${index}`}
                                                    />
                                                </div>
                                            }
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className="thumb-slider" data-aos="fade-up">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    onInit={setSwiperInstance}
                                    modules={[FreeMode, Navigation]}                                    
                                    breakpoints={{
                                        0: {
                                            spaceBetween: 10,
                                            slidesPerView: 3,
                                        },
                                        575: {
                                            spaceBetween: 16,
                                            slidesPerView: 3,
                                        },
                                        768: {
                                            spaceBetween: 20,
                                            slidesPerView: 3,
                                        },
                                    }}
                                >
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={`slide-thumb-${index}`}>
                                            {slide.thumb &&
                                                <div className="thumb-img">
                                                    <Image
                                                        src={slide.thumb}
                                                        width={160}
                                                        height={140}
                                                        loading="lazy"
                                                        alt={`Slider thumb image ${index}`}
                                                    />
                                                </div>
                                            }
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {navigation && 
                                    <>
                                        <div className="swiper-button-prev" ref={prevRef}>
                                            <Icons.ArrowLongLeft />
                                        </div>
                                        <div className="swiper-button-next" ref={nextRef}>
                                            <Icons.ArrowLongRight />
                                        </div>
                                    </>
                                }
                            </div>
                        </banner-slider>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default BannerWithSlider;