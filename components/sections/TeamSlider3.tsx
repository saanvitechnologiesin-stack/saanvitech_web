"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "@/styles/team.css";

import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Icons from "../Icons";
import TeamList from "@/data/teams.json";
import CardTeam2 from "../CardTeam2";

const TeamSlider3 = ({ data }: { data: SectionProps }) => {
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

  const teamList = TeamList;
  if (teamList.length == 0) return null;

  const { wrapperCls, container, subheading, heading, blockList } = data || {};
  return (
    <team-slider2>
      <div className={`our-team ${wrapperCls}`}>
        <div className={container}>
          <div className="section-headings section-headings-horizontal">
            <div className="section-headings-left">
              {subheading && (
                <Subheading title={subheading} cls="text-24" aos="fade-right" />
              )}

              {heading && (
                <Heading
                  title={heading}
                  cls="text-50"
                  aos="fade-right"
                  aosDelay="20"
                />
              )}
            </div>

            <div className="section-headings-right">
              <div className="swiper-nav-inner">
                <div ref={prevRef} className="swiper-button-prev">
                  <Icons.CaretSlimLeft />
                </div>
                <div ref={nextRef} className="swiper-button-next">
                  <Icons.CaretSlimRight />
                </div>
              </div>
            </div>
          </div>

          <div className="section-content" data-aos="fade-up">
            <Swiper
              modules={[Navigation]}
              onSwiper={setSwiperInstance}
              breakpoints={{
                0: { spaceBetween: 16, slidesPerView: 1.2 },
                575: { spaceBetween: 16, slidesPerView: 1.5 },
                768: { spaceBetween: 0, slidesPerView: 1.6 },
                992: { spaceBetween: 0, slidesPerView: 1.8 },
                1280: { spaceBetween: 0, slidesPerView: 2.2 },
              }}
              className="swiper"
            >
              {teamList?.map((card, i) => (
                <SwiperSlide key={i}>
                  <CardTeam2 data={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </team-slider2>
  );
};

export default TeamSlider3;
