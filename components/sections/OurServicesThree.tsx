"use client";

import "@/styles/multicolumn.css";
import "@/styles/our-services.css";
import Image from "next/image";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import { SectionProps } from "@/types/sectionProps";
import CardService4 from "../CardService4";

const OurServicesThree = ({ data }: { data: SectionProps }) => {
  const serviceList = ServiceList;
  if (serviceList.length == 0) return null;

  const { container, subheading, heading, backgroundImage, button } = data || {};

  return (
    <div className={`multicolumn section-padding`}>
       {backgroundImage &&
            <div className="media media-bg">
                <Image
                    src={backgroundImage.src}
                    width={backgroundImage.width}
                    height={backgroundImage.height}
                    loading={backgroundImage.loading}
                    alt={backgroundImage.alt ? backgroundImage.alt : 'bg image'}
                />
            </div>
        }
      <div className={container}>
        <div className="multicolumn-header section-headings">
          {subheading && (
            <Subheading
              title={subheading}
              cls="text-20 subheading-bg"
              aos="fade-up"
            />
          )}
          {heading && (
            <Heading
              title={heading}
              cls="text-50"
              aos="fade-up"
              aosDelay="100"
            />
          )}
        </div>
        <div className="service-slider section-content">
          <div className="grid grid-cols-12 gap-1 justify-center">
            {serviceList.slice(0, 3).map((service) => (
                <div 
                    className="xl:col-span-4 lg:col-span-6 col-span-12" 
                    data-aos="fade-up" 
                    key={`servicel-card-${service.id}`}
                >
                    <CardService4 data={service} />
                </div>
            ))}
          </div>
        </div>

        {button && (
          <div className="section-headings text-center">
            <div className="buttons" data-aos="fade-up">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurServicesThree;
