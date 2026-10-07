import "@/styles/image-with-text.css";
import { SectionProps } from "@/types/sectionProps";
import ThemeModalVideo from "../ThemeModalVideo";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import CounterUp4 from "./CounterUp4";

const ImageCounterVideo = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, subheading, heading, button, counterData } =
    data || {};

  return (
    <div className={`image-text about-us-video ${wrapperCls}`}>
      <div className={container}>
        <div className="grid grid-cols-12">
          <div className="xl:col-span-4 md:col-span-5 col-span-12">
            <div className="section-headings-vertical">
              {subheading && (
                <Subheading title={subheading} cls="text-24" aos="fade-right" />
              )}

              {counterData && <CounterUp4 data={counterData} />}
            </div>
          </div>

          <div className="xl:col-span-8 md:col-span-7 col-span-12">
            <div className="video-content-wrap">
              <div className="section-headings" data-aos="fade-left">
                {heading && <Heading title={heading} cls="text-50" />}

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
              <div>
                <ThemeModalVideo
                  video="/videos/video.mp4"
                  image="/img/why-choose-us/1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCounterVideo;
