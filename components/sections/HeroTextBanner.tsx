import "@/styles/hero-slider.css";
import "@/styles/hero-banner.css";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import { SectionProps } from "@/types/sectionProps";
import parser from "html-react-parser";

const HeroTextBanner = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        heading,
        text,
        block,
        primaryButton,
        secondaryButton,
        image
    } = data;
    
    return (
        <div className={`hero-banner-2 about-us-2 ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">
                        {heading && <h2 className="heading text-64 fw-700" data-aos="fade-up">{heading}</h2>}

                        {text && <p className="text text-18" data-aos="fade-up" data-aos-delay="100">{text}</p>}
                    </div>

                    <div className="section-headings-right">
                        {block &&
                            <div className="text-wrapper" data-aos="fade-up">
                                {block.heading &&
                                    <div className="flex items-start">
                                        <h2 className="heading text-80">{block.heading}</h2>

                                        {block.subheading &&<div className="heading text-24">{block.subheading}</div>}
                                    </div>
                                }

                                {block.text && 
                                    <div className="text text-18 fw-500">
                                        {parser(block.text)}
                                    </div>
                                }
                            </div>
                        }

                        <div className="buttons flex gap-1 flex-wrap" data-aos="fade-up" data-aos-delay="100">
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
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-content">
              <div className="banner-wrapper">
                {image && <Picture image={image} />}
              </div>
            </div>
        </div>
    )
}

export default HeroTextBanner;