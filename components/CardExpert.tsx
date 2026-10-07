import { SectionProps } from "@/types/sectionProps";
import Image from "next/image";
import Subheading from "./Subheading";
import Heading from "./Heading";
import Icons from "./Icons";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";

const CardExpert = ({ data }: { data: SectionProps }) => {
  const { subheading, heading, text, button, image, textList } = data || {};

  return (
    <div className="image-text-card">
      <div className="grid grid-cols-12 gap-1">
        {image && (
          <div className="lg:col-span-6 col-span-12">
            <div className="media-wrap">
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                loading={image.loading}
                alt={image.alt ? image.alt : "Image"}
              />
            </div>
          </div>
        )}
        <div className="lg:col-span-6 col-span-12">
          <div className="content section-headings">
            {subheading && (
              <Subheading title={subheading} cls="text-20" aos="fade-up" />
            )}

            {heading && <Heading title={heading} cls="text-36" aos="fade-up" />}

            {textList && (
              <ul className="text-lists list-unstyled">
                {textList.map((item, index) => (
                  <li
                    className="text-item text text-18"
                    data-aos="fade-up"
                    key={index}
                  >
                    <Icons.Check />
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
            <div className="buttons" data-aos="fade-up">
              {button && (
                <div className="buttons">
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

export default CardExpert;
