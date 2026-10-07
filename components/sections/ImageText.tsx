import "@/styles/image-with-text.css";
import { SectionProps } from "@/types/sectionProps";
import Image from "next/image";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Icons from "../Icons";
import GeometricCollage from "../GeometricCollage";

const ImageText = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        image,
        imageList,
        subheading,
        heading,
        text,
        textList,
        button
    } = data || {};

    return (
        <div className={`image-text ${wrapperCls}`}>
            <div className={container ? container : 'container'}>
                <div className="grid lg:grid-cols-2 lg:gap-1 items-center">
                    <div className="lg:col-span-1 col-span-2">
                        {imageList && imageList.length >= 3 ? (
                            <GeometricCollage images={imageList} />
                        ) : image ? (
                            <div className="media-wrap" data-aos="zoom-in-up">
                                <Image
                                    src={image.src}
                                    width={image.width}
                                    height={image.height}
                                    loading={image.loading}
                                    alt={image.alt ? image.alt : 'Image'}
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="lg:col-span-1 col-span-2">
                        <div className="content section-headings">
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
                                    cls="text-50"
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

                            {textList &&
                                <ul className="text-lists list-unstyled">
                                    {textList.map((item, index) => (
                                        <li 
                                            className="text-item text text-18" 
                                            data-aos="fade-up" 
                                            key={`text-item-${index}`}
                                        >
                                            <Icons.Check />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
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
    )
}

export default ImageText;