import "@/styles/why-choose-us.css";
import "@/styles/promotion.css";
import "@/styles/our-services.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const WhyChooseUs6 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, subheading, heading, button, image, promotions } =
    data || {};

  return (
    <div className={`our-services ${wrapperCls}`}>
      <div className="grid grid-cols-12">
        <div className="lg:col-span-6 col-span-12">
          {image && (
            <div
              className="service-content-image height-100"
              data-aos="zoom-out"
              data-aos-delay="100"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                loading={image.loading}
                alt={image.alt ? image.alt : "Image"}
              />
            </div>
          )}
        </div>
        <div className="lg:col-span-6 col-span-12">
          <div className="service-content-left">
            <div className="section-headings headings-width">
              {subheading && (
                <Subheading title={subheading} cls="text-24" aos="fade-up" />
              )}

              {heading && (
                <Heading
                  title={heading}
                  cls="text-50"
                  aos="fade-up"
                  aosDelay="50"
                />
              )}
              {promotions && (
                <div className="service-list">
                  {promotions.map((item, index) => (
                    <div
                      className="multicolumn-card"
                      data-aos="fade-up"
                      data-aos-delay="100"
                      key={index}
                    >
                      <h2 className="heading text-24">{item.title}</h2>
                      <div className="text text-16">{item.text}</div>
                    </div>
                  ))}
                </div>
              )}
              {button && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs6;
