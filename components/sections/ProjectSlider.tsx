'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import "@/styles/project.css";
import "@/styles/recent-project.css";
import Projects from "@/data/projects.json";
import CardProject from '../CardProject';

import Heading from "../Heading";
import Subheading from "../Subheading";
import Icons from "../Icons";
import { SectionProps } from "@/types/sectionProps";


const ProjectSlider = ({ data }: {data: SectionProps}) => {
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

    const projects = Projects;
    if(projects.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
    } = data || {};
    return (
        <project-slider className={`project-slider ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings headings-width text-center">
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
            </div>

            <div className="section-content">
                <div className="container-fluid slider-container" data-aos="fade-up" data-aos-delay="100">
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={setSwiperInstance}
                        breakpoints={{
                            0: { spaceBetween: 20, slidesPerView: 1.2 },
                            575: { spaceBetween: 20, slidesPerView: 1.8 },
                            768: { spaceBetween: 20, slidesPerView: 2 },
                            992: { spaceBetween: 30, slidesPerView: 3 },
                            1280: { spaceBetween: 40, slidesPerView: 4 },
                        }}
                        className="swiper"
                    >
                        {projects.map((project, i) => (
                            <SwiperSlide key={i}>
                                <CardProject data={project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                            
                {/* Navigation buttons */}
                <div className={container}>
                    <div className="swiper-nav-border" data-aos="fade-up" data-aos-delay="150">
                        <div className="swiper-nav-inner">
                            <div 
                                ref={prevRef} 
                                className="swiper-button-prev"
                            >
                                <Icons.ChevronLeft />
                            </div>
                            <div 
                                ref={nextRef} 
                                className="swiper-button-next"
                            >
                                <Icons.ChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </project-slider>
    )
}

export default ProjectSlider;