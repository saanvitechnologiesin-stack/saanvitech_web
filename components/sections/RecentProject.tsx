import "@/styles/recent-project.css";
import Heading from "../Heading";
import Subheading from "../Subheading";
import Text from "../Text";
import Image from "next/image";
import Link from "next/link";
import Icons from "../Icons";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { SectionProps } from "@/types/sectionProps";

const RecentProject = ({ data }: {data: SectionProps}) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        imageList,
        block,
        link,
    } = data || {};
    
    const image1 = imageList ? imageList[0] : null;
    const image2 = imageList ? imageList[1] : null;
    const image3 = imageList ? imageList[2] : null;

    return (
        <div className={`recent-project ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">
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
                            />
                        }
                    </div>

                    {text &&
                        <Text 
                            text={text}
                            cls="section-headings-right text-18"
                            aos="fade-left"
                        />
                    }
                </div>

                <div className="project-media">
                    <div className="grid lg:grid-cols-12 lg:gap-1">
                        <div className="lg:col-span-8 col-span-12">
                            {image1 &&
                                <div className="project-img-large">
                                    <div className="project-img radius18" data-aos="zoom-in-up">
                                        <Image
                                            src={image1.src}
                                            width={image1.width}
                                            height={image1.height}
                                            loading={image1.loading}
                                            alt={image1.alt ? image1.alt : 'Image'}
                                        />
                                    </div>
                                    {link &&
                                        <Link
                                            href={link}
                                            className="project-media-button button button--primary"
                                            data-aos="zoom-in-up"
                                            aria-label="project-button"
                                        >
                                            <Icons.ArrowCircleStraight />
                                        </Link>
                                    }
                                </div>
                            }
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="grid grid-cols-2 gap-1 project-img-small">
                                {image2 &&
                                    <div className="col-span-1">
                                        <div className="project-img radius18" data-aos="fade-left">
                                            <Image
                                                src={image2.src}
                                                width={image2.width}
                                                height={image2.height}
                                                loading={image2.loading}
                                                alt={image2.alt ? image2.alt : 'Image'}
                                            />
                                        </div>
                                    </div>
                                }

                                {image3 &&
                                    <div className="col-span-1">
                                        <div
                                            className="project-img radius18"
                                            data-aos="fade-left"
                                            data-aos-delay="200"
                                        >
                                            <Image
                                                src={image3.src}
                                                width={image3.width}
                                                height={image3.height}
                                                loading={image3.loading}
                                                alt={image3.alt ? image3.alt : 'Image'}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="project-content radius18 section-headings"
                    data-aos="fade-up"
                >
                    {block?.heading &&
                        <Heading 
                            title={block.heading}
                            cls="text-36"
                            aos="fade-up"
                        />
                    }

                    {block?.text &&
                        <Text 
                            text={block.text}
                            cls="text-18"
                            aos="fade-up"
                        />
                    }

                    {block?.button &&
                        <div
                            className="project-button buttons"
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            {block.button.type == 'primary' &&
                                <PrimaryButton 
                                    label={block.button.label}
                                    href={block.button.href}
                                    ariaLabel={block.button.label}
                                />
                            }

                            {block.button.type == 'secondary' &&
                                <SecondaryButton 
                                    label={block.button.label}
                                    href={block.button.href}
                                    ariaLabel={block.button.label}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentProject;