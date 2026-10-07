"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/team.css";
import { SectionProps } from "@/types/sectionProps";
import Subheading from "../Subheading";
import Heading from "../Heading";
import TeamList from "@/data/teams.json";
import CardTeam from "../CardTeam";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const TeamSlider2 = ({
  data,
  pagination,
}: {
  data: SectionProps;
  pagination: boolean;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const teamList = TeamList;
  if (teamList.length == 0) return null;

  const { wrapperCls, container, subheading, heading, button } = data || {};

  return (
    <team-slider className={`team-slider ${wrapperCls}`}>
      <div className={container}>
        <div className="section-headings section-headings-horizontal">
          <div className="section-headings-left">
            {subheading && (
              <Subheading title={subheading} cls="text-20" aos="fade-up" />
            )}

            {heading && <Heading title={heading} cls="text-50" aos="fade-up" />}
          </div>
          <div
            className="section-headings-right buttons"
            data-aos="fade-left"
            data-aos-delay="20"
          >
            {button && (
            <>
              {button.type == "primary" && (
                <PrimaryButton
                  label={button.label}
                  href={button.href}
                  ariaLabel={button.label}
                />
              )}

              {button.type == "secondary" && (
                <SecondaryButton
                  label={button.label}
                  href={button.href}
                  ariaLabel={button.label}
                />
              )}
            </>
          )}
          </div>
        </div>

        <div className="section-content" data-aos="fade-up">
          <Swiper
            modules={pagination ? [Pagination] : []}
            pagination={pagination ? { clickable: true } : undefined}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              575: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="swiper"
          >
            {teamList.map((member) => (
              <SwiperSlide key={member.id}>
                <CardTeam data={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </team-slider>
  );
};

export default TeamSlider2;
