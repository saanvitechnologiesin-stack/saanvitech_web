import "@/styles/hero-slider.css";
import "@/styles/hero-banner.css";
import SecondaryButton from "../buttons/SecondaryButton";
import Picture from "../Picture";
import { SectionProps } from "@/types/sectionProps";

const HeroTextBanner2 = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        heading,
        text,
        secondaryButton,
        image
    } = data;
    
    return (
        <div className={`hero-slider hero-banner-2 ${wrapperCls}`}>
          <div className="banner-wrapper-100vh">
               {image && <Picture image={image} />}
              <div className="content-absolute">
                  <div className={`${container} flex items-end height-100`}>
                      <div className="content-box">
                        {heading && <h2 className="heading text-64" data-aos="fade-down">{heading}</h2>}
                        <div className="section-headings section-headings-horizontal" data-aos="fade-up">
                            <div className="section-headings-left">
                                {text && <p className="text text-18">{text}</p>}
                            </div>
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
          </div>
      </div>
    )
}

export default HeroTextBanner2;