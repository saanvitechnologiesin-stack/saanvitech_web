import "@/styles/hero-slider.css";
import "@/styles/hero-banner.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import { SectionProps } from "@/types/sectionProps";


const HeroBannerButton = ({ data }: { data: SectionProps }) => {
    const { 
        wrapperCls,
        subheading,
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
                    <div className="container height-100 flex items-center justify-center text-center">
                        <div className="content-box section-headings">
                            {subheading && 
                                <Subheading 
                                    title={subheading}
                                    cls="text-20"
                                    aos="fade-up"
                                />
                            }

                            {heading && 
                                <Heading 
                                    title={heading}
                                    styledText={styledText}
                                    styledTextCls={styledTextCls}
                                    cls="text-80"
                                    aos="fade-up"
                                    aosDelay="100"
                                />
                            }

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
                                    className="buttons flex justify-center gap-1 flex-wrap" 
                                    data-aos="fade-up" 
                                    data-aos-delay="300"
                                >
                                    {primaryButton && 
                                        <PrimaryButton 
                                            label={primaryButton.label}
                                            href={primaryButton.href}
                                            ariaLabel={primaryButton.label}
                                        />
                                    }

                                    {secondaryButton && 
                                        <SecondaryButton 
                                            label={secondaryButton.label}
                                            href={secondaryButton.href}
                                            ariaLabel={secondaryButton.label}
                                            cls="button-without-icon" 
                                            showIcon={false}
                                        />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default HeroBannerButton;