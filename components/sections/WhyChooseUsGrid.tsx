import "@/styles/why-choose-us.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Text from "../Text";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";


const WhyChooseUsGrid = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        button,
        image,
        promotions,
        rotatingLogo,
        promoImage,
        backgroundImage,
    } = data || {};

    return (
        <div className={`why-choose-us ${wrapperCls}`}>
            {backgroundImage &&
                <div className="media media-bg">
                    <Image
                        src={backgroundImage.src}
                        alt={backgroundImage.alt ? backgroundImage.alt : "Background image"}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        loading={backgroundImage.loading}
                    />
                </div>
            }
            <div className={container}>
                <div className="choose-top">
                    <div className="grid grid-cols-2 lg:gap-1">
                        <div className="col-span-2 lg:col-span-1">
                            {image && 
                                <picture className="choose-media radius18" data-aos="fade-right">
                                    {image.srcMobile &&
                                        <source
                                            media="(max-width: 575px)"
                                            srcSet={image.srcMobile}
                                        />
                                    }
                                <Image 
                                    src={image.src}
                                    alt={image.alt ? image.alt : 'Image'}
                                    width={image.width}
                                    height={image.height}
                                    loading={image.loading}
                                />
                                </picture>
                            }
                        </div>
                        
                        <div className="col-span-2 lg:col-span-1">
                            <div className="choose-us-content section-headings">
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
                                        cls="text-40"
                                        aos="fade-up"
                                    />
                                }

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

                                {rotatingLogo &&
                                    <div className="choose-logo">
                                        <div 
                                            className="choose-rotating-logo svg-wrapper" 
                                            data-aos="zoom-in-up"
                                        >
                                            {rotatingLogo.logo && 
                                                <span className="svg-wrapper infinite-rotate">
                                                    {rotatingLogo.logo}
                                                </span>
                                            }

                                            {rotatingLogo.text && 
                                                <span className="text-abs">{rotatingLogo.text}</span>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="choose-bottom">
                    {promotions &&
                        <div className="choose-bottom-cards">
                            <div className="grid grid-cols-12 gap-1">
                                {promotions.map((item, index) => (                                   
                                    <div 
                                        className="col-span-12 lg:col-span-6 xl:col-span-4" 
                                        data-aos="fade-up" 
                                        key={`promo-${index}`} 
                                    >
                                        <div className="card-icon-text card-icon-text-horizontal">
                                            {item.icon && 
                                                <div className="svg-wrapper">{item.icon}</div>
                                            }

                                            <div className="content">
                                                {item.title && 
                                                    <h2 className="heading text-20 fw-700">
                                                        {item.title}
                                                    </h2>
                                                }

                                                {item.text && 
                                                    <p className="text text-16">
                                                        {item.text}
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    </div> 
                                ))}    
                            </div>
                        </div>
                    }

                    {promoImage && 
                        <div 
                            className="choose-media-absolute radius18" 
                            data-aos="fade-up" 
                            data-aos-delay="400"
                        >
                            <Image 
                                src={promoImage.src}
                                alt={promoImage.alt ? promoImage.alt : 'Image'}
                                width={promoImage.width}
                                height={promoImage.height}
                                loading={promoImage.loading}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUsGrid;