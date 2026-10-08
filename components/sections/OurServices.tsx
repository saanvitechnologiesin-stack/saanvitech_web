'use client';

import { useEffect, useRef } from "react";
import "@/styles/multicolumn.css";
import Image from "next/image";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import ServiceList from "@/data/services.json";
import CardService from "../CardService";
import { SectionProps } from "@/types/sectionProps";

const OurServices = ({ data }: { data: SectionProps }) => {
    const serviceList = ServiceList;
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const {
        wrapperCls,
        container,
        backgroundImage,
        subheading,
        heading,
        text,
    } = data || {};

    useEffect(() => {
        let animationFrameId: number;

        const handleScroll = () => {
            if (!containerRef.current || !trackRef.current) return;

            if (window.innerWidth <= 768) {
                trackRef.current.style.transform = "none";
                return;
            }

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const containerHeight = rect.height;
            const scrollDistance = containerHeight - windowHeight;

            if (scrollDistance <= 0) return;

            const currentScroll = -rect.top;
            const rawProgress = currentScroll / scrollDistance;
            const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = Math.max(0, trackWidth - viewportWidth + 80);
            const translateX = clampedProgress * maxTranslate;

            trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
        };

        const onScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [serviceList.length]);

    if (!serviceList || serviceList.length === 0) return null;

    return (
        <div ref={containerRef} className={`services-scroll-container ${wrapperCls}`}>
            <div className="services-sticky-viewport">
                {backgroundImage && (
                    <div className="media media-bg">
                        <Image
                            src={backgroundImage.src}
                            width={backgroundImage.width}
                            height={backgroundImage.height}
                            loading={backgroundImage.loading}
                            alt={backgroundImage.alt ? backgroundImage.alt : 'bg image'}
                        />
                    </div>
                )}

                <div className={`${container ? container : 'container'} services-content-wrap`}>
                    <div className="multicolumn-header section-headings">
                        {subheading && (
                            <Subheading 
                                title={subheading}
                                cls="text-20"
                            />
                        )}

                        {heading && (
                            <Heading 
                                title={heading}
                                cls="text-50"
                            />
                        )}

                        {text && (
                            <Text
                                text={text}
                                cls="text-18"
                            />
                        )}
                    </div>
                </div>

                {/* Horizontal Sliding Cards Track */}
                <div className="services-horizontal-viewport">
                    <div ref={trackRef} className="services-horizontal-track">
                        {serviceList.map((service, index) => (
                            <div 
                                className="services-horizontal-card-item" 
                                key={`service-card-scroll-${service.id || index}`}
                            >
                                <CardService data={service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;