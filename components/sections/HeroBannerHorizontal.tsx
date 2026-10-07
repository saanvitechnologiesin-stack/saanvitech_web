import '@/styles/hero-banner.css';
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import parse from 'html-react-parser';

const HeroBannerHorizontal = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        image,
        heading,
        text,
        block
    } = data || {};

    return(
        <div className={`hero-banner-2 about-us-2 ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">                        
                        {heading && 
                            <Heading 
                                title={heading}
                                cls="text-64 fw-700"
                                aos="fade-up"
                            />
                        }

                        {text && 
                            <Text 
                                text={text}
                                cls="text-18"
                                aos="fade-up"
                                aosDelay="100"                                
                            />
                        }
                    </div>
                    {block &&
                        <div className="section-headings-right">
                            <div className="text-wrapper" data-aos="fade-up">
                                <div className="flex items-start">
                                    {block.heading && 
                                        <h2 className="heading text-80">{block.heading}</h2>
                                    }
                                    
                                    {block.headingSup && 
                                        <div className="heading text-24">{block.headingSup}</div>
                                    }
                                </div>
                                {block.text && 
                                    <div className="text text-18 fw-500">{parse(block.text)}</div>
                                }
                            </div>
                            <div className="buttons flex justify-start gap-1 flex-wrap" data-aos="fade-up" data-aos-delay="100">
                                {block.button && (                                
                                    block.button.type == 'primary' ? (
                                        <PrimaryButton 
                                            label={block.button.label}
                                            href={block.button.href}
                                            ariaLabel={block.button.ariaLabel}
                                        />
                                    ) : (
                                    <SecondaryButton 
                                            label={block.button.label}
                                            href={block.button.href}
                                            ariaLabel={block.button.ariaLabel}
                                        />
                                    )
                                )}

                                {block.button2 && (                                
                                    block.button2.type == 'primary' ? (
                                        <PrimaryButton 
                                            label={block.button2.label}
                                            href={block.button2.href}
                                            ariaLabel={block.button2.ariaLabel}
                                        />
                                    ) : (
                                    <SecondaryButton 
                                            label={block.button2.label}
                                            href={block.button2.href}
                                            ariaLabel={block.button2.ariaLabel}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>

            {image &&             
            <div className="section-content">
              <div className="banner-wrapper">
                 <Picture image={image} />
              </div>
            </div>
            }
        </div>
    )
}

export default HeroBannerHorizontal;