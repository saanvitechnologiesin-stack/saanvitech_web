import { TeamMemberType } from "@/types/teamMember";
import Image from "next/image";
import Icons from "../Icons";
import Link from "next/link";
import parser from "html-react-parser";

import ProgressBar from "../ProgressBar";

const TeamMemberDetails = ({ 
    container,
    data
 }: {
    container?: string;
    data: TeamMemberType;
 }) => {
    const {
        image,
        name,
        designation,
        year_of_expertise,
        expertise,
        phone,
        email,
        social,
        biography,
        about,
        about_skills,
        skills,
    } = data || {};

    return (
        <div className="team-details mt-100 mb-100">
            <div className={container}>
                <div className="grid grid-cols-2 md:gap-1 items-center">
                    <div className="md:col-span-1 col-span-2 td-column">
                        <div className="td-media-wrap" data-aos="fade-up">
                            {image &&
                                <>
                                    <div className="td-media radius18">
                                        <Image
                                            src={image}
                                            width="1000"
                                            height="1133"
                                            loading="lazy"
                                            alt="Image"
                                        />
                                    </div>
                                    {year_of_expertise &&
                                        <div className="text-absolute heading text-24">
                                            {year_of_expertise} years of experience
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-2">
                        <div className="content-info">
                            {name &&
                                <h2 className="heading text-50" data-aos="fade-up">
                                    {name}
                                </h2>
                            }

                            {designation &&
                                <div
                                    className="info-desig heading text-22"
                                    data-aos="fade-up"
                                    data-aos-delay="50"
                                >
                                    {designation}
                                </div>
                            }

                            {expertise &&
                                <p
                                    className="info-desc text text-18"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    {expertise}
                                </p>
                            }

                            {phone &&
                                <div
                                    className="phn-number text text-18"
                                    data-aos="fade-up"
                                    data-aos-delay="150"
                                >
                                    <Icons.Phone2 />
                                    {phone}
                                </div>
                            }

                            {email &&
                                <div
                                    className="email text text-18"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <Icons.Email />
                                    {email}
                                </div>
                            }

                            {social &&
                                <ul className="social-icons list-unstyled">
                                    {social.facebook_url &&
                                        <li data-aos="fade-up" data-aos-delay="100">
                                            <Link
                                                className="social-link text"
                                                href={social.facebook_url}
                                                target="_blank"
                                            >
                                                <Icons.FaceBook />
                                                <span className="visually-hidden">Facebook</span>
                                            </Link>
                                        </li>
                                    }

                                    {social.linkedin_url &&
                                        <li data-aos="fade-up" data-aos-delay="200">
                                            <Link
                                                className="social-link text"
                                                href={social.linkedin_url}
                                                target="_blank"
                                            >
                                                <Icons.LinkedIn />
                                                <span className="visually-hidden">Linkedin</span>
                                            </Link>
                                        </li>
                                    }

                                    {social.twitter_url &&
                                        <li data-aos="fade-up" data-aos-delay="300">
                                            <Link
                                                className="social-link text"
                                                href={social.twitter_url}
                                                target="_blank"
                                            >
                                                <Icons.Twitter />
                                                <span className="visually-hidden">Twitter</span>
                                            </Link>
                                        </li>
                                    }

                                    {social.instagram_url &&
                                        <li data-aos="fade-up" data-aos-delay="400">
                                            <Link
                                                className="social-link text"
                                                href={social.instagram_url}
                                                target="_blank"
                                            >
                                                <Icons.Instagram />
                                                <span className="visually-hidden">Instagram</span>
                                            </Link>
                                        </li>
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                </div>

                {biography &&
                    <div className="team-bio mt-100">
                        <h2 className="heading text-36" data-aos="fade-up">Short Biography</h2>
                        <p className="text text-18" data-aos="fade-up" data-aos-delay="50">
                            {parser(biography)}
                        </p>
                    </div>
                }

                <div className="about-me-container mt-100">
                    <div className="grid grid-cols-2 lg:gap-1">
                        <div className="lg:col-span-1 col-span-2">
                            {about &&
                                <div className="team-about">
                                    <h2 className="heading text-36" data-aos="fade-up">About Me</h2>
                                    <p 
                                        className="text text-18" 
                                        data-aos="fade-up" 
                                        data-aos-delay="50"
                                    >
                                        {parser(about)}
                                    </p>
                                </div>
                            }
                        </div>
                        
                        <div className="lg:col-span-1 col-span-2">
                            {about_skills &&
                                <div className="team-progress">
                                    <h2 className="heading text-36" data-aos="fade-up">
                                        Professional skills
                                    </h2>
                                    <p className="text text-18" data-aos="fade-up">
                                        {parser(about_skills)}
                                    </p>
                                </div>
                            }
                            
                            {skills &&
                                <ProgressBar>
                                    <div className="progress-wrap">
                                        {Object.entries(skills).map(([key, value]) => {
                                            const title = 
                                                key
                                                .split('_')
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ");

                                            return (
                                                <div 
                                                    className="progress-item" 
                                                    data-progress={value}
                                                    data-aos="fade-up"
                                                    key={key}
                                                >
                                                    <div className="heading text-16">{title}</div>
                                                    <div className="progress-container">
                                                        <div className="progress--bar"></div>
                                                        <div className="progress-number heading text-16">
                                                            0%
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </ProgressBar>
                            }
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default TeamMemberDetails;