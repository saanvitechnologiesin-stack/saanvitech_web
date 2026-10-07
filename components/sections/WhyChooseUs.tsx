import "@/styles/promotion.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Text from "../Text";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import PromotionList from "../PromotionList";
import CounterUpVertical from "./CounterUpVertical";


const WhyChooseUs = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        button,
        image,
        promotions,
        counterData,
    } = data || {};

    return (
        <div className={`promotion ${wrapperCls}`}>
            <div className={container}>
                <div className="promotion-container">
                    <div className="grid grid-cols-12 lg:gap-1">
                        <div className="lg:col-span-7 col-span-12">
                            <div className="promtion-content section-headings">
                                {subheading &&
                                    <Subheading 
                                        title={subheading}
                                        cls="text-20"
                                        aos="fade-right"
                                    />
                                }

                                {heading &&
                                    <Heading 
                                        title={heading}
                                        cls="text-50"
                                        aos="fade-right"
                                        aosDelay="200"
                                    />
                                }

                                {text &&
                                    <Text 
                                        text={text}
                                        cls="text-18"
                                        aos="fade-right"
                                        aosDelay="200"
                                    />
                                }
                                
                                {promotions && <PromotionList items={promotions} />}

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
                        <div className="lg:col-span-5 col-span-12">
                            <div className="promotion-img radius18" data-aos="flip-left">
                                {image &&
                                    <Image
                                        src={image.src}
                                        width={image.width}
                                        height={image.height}
                                        loading={image.loading}
                                        alt={image.alt ? image.alt : 'Image'}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    {counterData && <CounterUpVertical data={counterData} />}
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs;