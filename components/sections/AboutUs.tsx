import { SectionProps } from "@/types/sectionProps";
import Image from "next/image";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const AboutUs = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        image,
        heading,
        text,
        button
    } = data || {};

    return (
        <div className={`about-us-2 ${wrapperCls}`}>
            <div className={container}>
                {image &&
                    <picture className="flex radius18" data-aos="zoom-in" data-aos-duration="2000">
                        {image.srcMobile && <source media="(max-width: 575px)" srcSet={image.srcMobile}/>}
                        {image.srcTablet && <source media="(max-width: 991px)" srcSet={image.srcTablet}/>}
                        
                        <Image
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            loading={image.loading}
                            alt={image.alt ? image.alt : 'Image'}
                        />
                    </picture>
                }
            </div>
          
            <div className="container">
                <div className="section-content">
                    <div className="grid grid-cols-2 gap-1 product-grid">
                        {heading && 
                            <div className="col-span-2 md:col-span-1">
                                <div className="section-headings">
                                    <Heading 
                                        title={heading}
                                        cls="text-50"
                                        aos="fade-up"
                                    />
                                </div>
                            </div>
                        }

                        <div className="col-span-2 md:col-span-1">
                            <div className="section-headings ps-md-2 ps-lg-5">
                                {text && 
                                    <Text 
                                        text={text}
                                        cls="text-18"
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
            </div>
      </div>
    )
}

export default AboutUs;