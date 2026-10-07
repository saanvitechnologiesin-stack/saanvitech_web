import "@/styles/image-with-text.css";
import "@/styles/hero-banner.css";
import "@/styles/why-choose-us.css";
import { SectionProps } from "@/types/sectionProps";
import Image from "next/image";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Icons from "../Icons";

const OurCompany = ({ data }: { data: SectionProps }) => {
  const {
    wrapperCls,
    container,
    image,
    subheading,
    heading,
    text,
    textList,
    rotatingLogo,
    button,
  } = data || {};

  return (
    <div className={`hero-banner who-we-are ${wrapperCls}`}>
      <div className={container}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-1.5 items-center">
          <div className="col-span-1 multi-col m-0!">
            <div className="main-img" data-aos="fade-up">
              {image && (
                <div className="media-wrap" data-aos="zoom-in-up">
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    loading={image.loading}
                    alt={image.alt ? image.alt : "Image"}
                  />
                </div>
              )}
              {rotatingLogo && (
                <div className="banner-badge svg-wrapper">
                  <div className="choose-rotating-logo" data-aos="zoom-in-up">
                    {rotatingLogo.logo && (
                      <span className="infinite-rotate">
                        {rotatingLogo.logo}
                      </span>
                    )}

                    {rotatingLogo.text && (
                      <span className="text-abs">{rotatingLogo.text}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 multi-col m-0!">
            <div className="content section-headings">
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

              {text && (
                <Text text={text} cls="text-18" aos="fade-up" aosDelay="150" />
              )}
              {textList && (
                <ul className="text-lists list-unstyled">
                  {textList.map((item, index) => (
                    <li
                      className="text-item text text-18"
                      data-aos="fade-up"
                      key={`text-item-${index}`}
                    >
                      <Icons.Check />
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}

              {button && (
                <div
                  className="hero-button-wrap buttons"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
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

export default OurCompany;
