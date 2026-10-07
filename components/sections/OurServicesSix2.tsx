"use client";

import "@/styles/image-with-text.css";
import "@/styles/our-services.css";
import "@/styles/card-working-process.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import CardService3 from "../CardService3";
import { SectionProps } from "@/types/sectionProps";

const OurServicesSix2 = ({ data }: { data: SectionProps }) => {
  const serviceList = ServiceList;
  if (serviceList.length == 0) return null;

  const { container, subheading, heading, button } = data || {};

  return (
    <div className="our-services-3 mt-100">
      <div className={container}>
        <div className="section-headings headings-width text-center">
          {subheading && (
            <Subheading title={subheading} cls="text-20" aos="fade-up" />
          )}

          {heading && <Heading title={heading} cls="text-50" aos="fade-up" />}
        </div>
        <div className="section-content">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
            {serviceList.slice(0, 6).map((service) => (
              <div
                className="col-span-1 multi-col m-0!"
                data-aos="fade-up"
                key={`servicel-card-${service.id}`}
              >
                <CardService3 data={service} />
              </div>
            ))}
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
    </div>
  );
};

export default OurServicesSix2;
