import "@/styles/hero-slider.css";
import "@/styles/hero-banner.css";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import { SectionProps } from "@/types/sectionProps";


const HeroLargeTextBanner = ({ data }: { data: SectionProps }) => {
    const { 
        wrapperCls,
        heading,
        styledText,
        styledTextCls,
        text,
        primaryButton,
        secondaryButton,
        image
    } = data || {};

    return (
       <div className={`hero-slider ${wrapperCls}`}>
        <div className="slider-card slider-card-4 overlay">
          {image && <Picture image={image} />}
          <div className="slider-content">
            <div className="container-fluid">
              <div className="grid grid-cols-12 gap-1 product-grid">
                <div className="col-span-12 lg:col-span-8" data-aos="fade-right">
                  {heading && 
                        <Heading 
                            title={heading}
                            styledText={styledText}
                            styledTextCls={styledTextCls}
                            cls="text-180"
                            aos="fade-up"
                            aosDelay="100"
                        />
                    }
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <div className="section-headings section-headings-vertical height-100">
                    {text && 
                        <Text 
                            text={text}
                            cls="text-18"
                            aos="fade-up"
                            aosDelay="200"
                        />
                    }

                    {primaryButton && secondaryButton && 
                        <div 
                            className="buttons flex gap-1 flex-wrap" 
                            data-aos="fade-up" 
                            data-aos-delay="300"
                        >
                            {primaryButton && 
                                <PrimaryButton 
                                    label={primaryButton.label}
                                    href={primaryButton.href}
                                    ariaLabel={primaryButton.label}
                                    cls="button-with-icon" 
                                    showIcon={true}
                                />
                            }

                            {secondaryButton && 
                                <SecondaryButton 
                                    label={secondaryButton.label}
                                    href={secondaryButton.href}
                                    ariaLabel={secondaryButton.label}
                                    cls="button-with-icon" 
                                    showIcon={true}
                                />
                            }
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeroLargeTextBanner;