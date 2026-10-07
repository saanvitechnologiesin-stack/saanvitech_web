import "@/styles/why-choose-us.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const WhyChooseUs3 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, subheading, heading, button, image, promotions } =
    data || {};

  return (
    <div className={`our-services ${wrapperCls}`}>
      <div className="grid grid-cols-12 gap-1">
        <div className="lg:col-span-5 col-span-12 lg:col-start-8 lg:row-start-1">
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
        <div className="lg:col-span-7 col-span-12 lg:col-start-1 lg:row-start-1">
          <div className="service-content-left">
            <div className="section-headings headings-width">
              {subheading && (
                <Subheading title={subheading} cls="text-20" aos="fade-up" />
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
                  <div className="grid grid-cols-12 gap-1 product-grid">
                    {promotions.map((item, index) => (
                      <div
                        className="lg:col-span-6 col-span-12"
                        key={`promo-${index}`}
                      >
                        <div
                          className="multicolumn-card"
                          data-aos="fade-up"
                          data-aos-delay="100"
                        >
                          {item.icon && (
                            <div className="card-icon">{item.icon}</div>
                          )}
                          {item.title && (
                            <h2 className="heading text-20 fw-700">
                              {item.title}
                            </h2>
                          )}
                          {item.text && (
                            <p className="text text-16">{item.text}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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

export default WhyChooseUs3;
