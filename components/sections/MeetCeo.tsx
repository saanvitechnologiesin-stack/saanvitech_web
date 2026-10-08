import "@/styles/meet-ceo.css";
import "@/styles/team.css";
import { MeetCeoDataType } from "@/data/sections/meetCeoData";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Image from "next/image";
import Link from "next/link";
import Icons from "../Icons";

const MeetCeo = ({ data }: { data: MeetCeoDataType }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        image,
        name,
        designation,
        quote,
        social,
    } = data || {};

    return (
        <div className={`meet-ceo ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings headings-width text-center">
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
                </div>

                <div className="meet-ceo-content" data-aos="fade-up">
                    <div className="meet-ceo-grid">
                        {/* CEO Image with hover social icons — same as card-team */}
                        <div className="meet-ceo-image-wrap">
                            <div className="card-team radius18">
                                {image &&
                                    <Image
                                        src={image.src}
                                        width={image.width}
                                        height={image.height}
                                        loading={image.loading}
                                        alt={image.alt || "CEO Image"}
                                    />
                                }

                                <div className="card-team-content-absolute">
                                    <div className="card-team-content">
                                        {name && 
                                            <span className="heading text-22 fw-600">
                                                {name}
                                            </span>
                                        }
                                        {designation && 
                                            <p className="text text-18">{designation}</p>
                                        }
                                    </div>
                                </div>

                                {social &&
                                    <div className="social-list">
                                        {social.linkedin_url &&
                                            <Link 
                                                href={social.linkedin_url} 
                                                className="svg-wrapper" 
                                                aria-label="LinkedIn" 
                                                target="_blank"
                                            >
                                                <Icons.LinkedIn className="icon icon-20" />
                                            </Link>
                                        }
                                        
                                        {social.twitter_url &&
                                            <Link 
                                                href={social.twitter_url} 
                                                className="svg-wrapper" 
                                                aria-label="Twitter" 
                                                target="_blank"
                                            >
                                                <Icons.Twitter className="icon icon-20" />
                                            </Link>
                                        }

                                        {social.instagram_url &&
                                            <Link 
                                                href={social.instagram_url} 
                                                className="svg-wrapper" 
                                                aria-label="Instagram" 
                                                target="_blank"
                                            >
                                                <Icons.Instagram className="icon icon-20" />
                                            </Link>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        {/* CEO Info */}
                        <div className="meet-ceo-info">
                            <div className="meet-ceo-info-inner">
                                {name &&
                                    <h3 className="heading text-36 fw-700" data-aos="fade-left">
                                        {name}
                                    </h3>
                                }
                                {designation &&
                                    <p className="meet-ceo-designation text-20" data-aos="fade-left" data-aos-delay="100">
                                        {designation}
                                    </p>
                                }
                                <div className="meet-ceo-divider" data-aos="fade-left" data-aos-delay="150"></div>
                                {quote &&
                                    <blockquote className="meet-ceo-quote text-18" data-aos="fade-left" data-aos-delay="200">
                                        <Icons.Quote2 className="meet-ceo-quote-icon" />
                                        {quote}
                                    </blockquote>
                                }
                                {social &&
                                    <div className="meet-ceo-social" data-aos="fade-left" data-aos-delay="300">
                                        {social.linkedin_url &&
                                            <Link 
                                                href={social.linkedin_url} 
                                                className="meet-ceo-social-link" 
                                                aria-label="LinkedIn" 
                                                target="_blank"
                                            >
                                                <Icons.LinkedIn className="icon icon-20" />
                                            </Link>
                                        }
                                        {social.twitter_url &&
                                            <Link 
                                                href={social.twitter_url} 
                                                className="meet-ceo-social-link" 
                                                aria-label="Twitter" 
                                                target="_blank"
                                            >
                                                <Icons.Twitter className="icon icon-20" />
                                            </Link>
                                        }
                                        {social.instagram_url &&
                                            <Link 
                                                href={social.instagram_url} 
                                                className="meet-ceo-social-link" 
                                                aria-label="Instagram" 
                                                target="_blank"
                                            >
                                                <Icons.Instagram className="icon icon-20" />
                                            </Link>
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

export default MeetCeo;
