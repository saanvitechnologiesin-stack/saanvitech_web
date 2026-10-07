import "@/styles/why-choose-us.css";
import "@/styles/promotion.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Image from "next/image";
import { CounterUpData } from "@/data/sections/counterUpData";
import CounterUp3 from "./CounterUp3";

const WhyChooseUs5 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, subheading, heading, button, backgroundImage, promotions } =
    data || {};

  return (
    <div className={`promotion-has-column ${wrapperCls}`}>
      <div className="container">
        <div className="section-headings headings-width text-center">
          {subheading && (
            <Subheading title={subheading} cls="text-20" aos="fade-up" />
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
        <div className="section-content">
          {promotions && (
            <div className="grid grid-cols-12 gap-1">
              {promotions.map((item, index) => (
                <div
                  className="xl:col-span-3 md:col-span-6 col-span-12"
                  key={`promo-${index}`}
                >
                  <div className="promotion-item" data-aos="fade-up">
                    {item.icon && <div className="card-icon">{item.icon}</div>}
                    <div className="promotion-title">
                      {item.title && (
                        <h2 className="heading text-24 fw-600">{item.title}</h2>
                      )}
                    </div>

                    {item.text && (
                      <div className="promotion-text text text-18">
                        {item.text}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="promotion-media-wrap">
          {backgroundImage && 
            <div className="media media-bg overlay">
              <Image
                src={backgroundImage.src}
                width={backgroundImage.width}
                height={backgroundImage.height}
                loading={backgroundImage.loading}
                alt={backgroundImage.alt ? backgroundImage.alt : 'image'}
              />
            </div>
          }
            <div className="promotion-counter">
              <CounterUp3 data={CounterUpData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs5;
