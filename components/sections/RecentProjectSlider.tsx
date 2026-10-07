"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "@/styles/recent-project.css";


import ProjectList from "@/data/projects.json";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Icons from "../Icons";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import CardProject3 from "../CardProject3";

const RecentProjectSlider = ({
  data,
  pagination,
}: {
  data: SectionProps;
  pagination: boolean;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { wrapperCls, container, button, subheading, heading } = data || {};

  const projectList = ProjectList;

  if (projectList.length == 0) return null;

  return (
    <div className={`recent-project-slider ${wrapperCls}`}>
      <div className={container}>
        <div className="section-headings section-headings-horizontal items-end!">
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

          <div
            className="section-headings-right buttons hidden lg:flex"
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
                    showIcon={true}
                  />
                )}

                {button.type == "secondary" && (
                  <SecondaryButton
                    label={button.label}
                    href={button.href}
                    ariaLabel={button.label}
                    showIcon={true}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className="section-content" data-aos="fade-up">
          <div className="container">
            <recent-project>
              <Swiper
                modules={pagination ? [Pagination] : []}
                pagination={pagination ? { clickable: true } : undefined}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  575: {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                  },
                  992: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 1.8,
                    spaceBetween: 30,
                  },
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="swiper"
              >
                {ProjectList.map((project, index) => (
                  <SwiperSlide key={index}>
                    <CardProject3 data={project} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </recent-project>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProjectSlider;
