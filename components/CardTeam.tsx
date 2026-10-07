import { TeamMemberDataType } from "@/types/teamMember";
import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";

const CardTeam = ({
    data
}: TeamMemberDataType) => {
    const {
        name,
        designation,
        image,
        social,
        slug
    } = data || {};

    return(
        <div className="card-team radius18">
            {image && 
                <Image
                    src={image}
                    alt={`Image of ${name}`}
                    width={500}
                    height={619}
                    loading="lazy"
                />
            }

            <div className="card-team-content-absolute">
                <div className="card-team-content">
                    {name &&
                        <Link
                            href={`/teams/${slug}`}
                            aria-label={`Details of ${name}`}
                            className="heading text-22 fw-600"
                        >
                            {name}
                        </Link>
                    }

                    {designation && <p className="text text-18">{designation}</p>}
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
                            aria-label="instagram" 
                            target="_blank"
                        >
                            <Icons.Instagram className="icon icon-20" />
                        </Link>
                    }
                </div>
            }
        </div>
    )
}

export default CardTeam;