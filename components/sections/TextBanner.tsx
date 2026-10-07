import "@/styles/hero-banner.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";


const TextBanner = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        button,
    } = data || {};

    return (
        <div className={`text-banner ${wrapperCls}`}>
            <div className={container}>
                <div className="text-banner-inner radius18">
                    <div className="section-headings">
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
                                cls="text-80"
                                aos="fade-up"
                            />
                        }

                        {text &&
                            <Text 
                                text={text}
                                cls="text-24"
                                aos="fade-up"
                            />
                        }

                        {button &&
                            <div className="buttons" data-aos="fade-up">
                                {button.type == 'primary' &&
                                    <PrimaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }

                                {button.type == 'secondary' &&
                                    <SecondaryButton 
                                        label={button.label}
                                        href={button.href}
                                        ariaLabel={button.label}
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextBanner;