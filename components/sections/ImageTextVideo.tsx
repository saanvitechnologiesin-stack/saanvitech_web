import "@/styles/image-with-text.css";
import { SectionProps } from "@/types/sectionProps";
import ThemeModalVideo from "../ThemeModalVideo";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";

const ImageTextVideo = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, heading, text, text2, button } = data || {};

  return (
    <div className={`image-text ${wrapperCls}`}>
      <div className={container}>
        <div className="headings-width">
          {heading && <Heading title={heading} cls="text-50" aos="fade-down" />}
        </div>
        <div className="section-content">
          <div className="grid grid-cols-12 gap-1 product-grid xl:items-center">
            <div className="lg:col-span-5 col-span-12">
              <ThemeModalVideo
                cls="section-headings-sticky height-100"
                video="/videos/video.mp4"
                image="/img/why-choose-us/1.jpg"
              />
            </div>
            <div className="lg:col-span-7 col-span-12">
              <div className="lg:px-1 section-headings">
                {text && <Text text={text} cls="text-18" aos="fade-up" />}
                {text2 && <Text text={text2} cls="text-18 mt-1!" aos="fade-up"/>}
                {button && (
                  <div className="buttons" data-aos="fade-up">
                    {button.type == "primary" && (
                      <PrimaryButton
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
    </div>
  );
};

export default ImageTextVideo;
