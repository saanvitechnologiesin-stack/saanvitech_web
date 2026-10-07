import "@/styles/hero-slider.css";
import "@/styles/hero-banner.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import { SectionProps } from "@/types/sectionProps";

const HeroBanner = ({ data }: { data: SectionProps }) => {
    const {        
        wrapperCls,
        subheading,
        heading,
        text,
        button,
        image
    } = data || {};

    return (
        <div className={`hero-slider ${wrapperCls}`}>
            <div className="slider-card overlay">
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
                                    cls="text-90"
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

                            {button &&
                                <div className="buttons" data-aos="fade-up" data-aos-delay="300">
                                        {button.type == 'primary' &&
                                            <PrimaryButton 
                                                label={button.label}
                                                href={button.href}
                                                ariaLabel="Hero button"
                                            />
                                        }

                                        {button.type == 'secondary' &&
                                            <SecondaryButton 
                                                label={button.label}
                                                href={button.href}
                                                ariaLabel="Hero button"
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

export default HeroBanner;