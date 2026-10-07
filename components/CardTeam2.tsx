import { TeamMemberDataType } from "@/types/teamMember";
import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";

const CardTeam2 = ({ data }: TeamMemberDataType) => {
  const { name, designation, image, social, slug, expertise } = data || {};

  const turnCateWords = (text: string, limit: number): string => {
    return text.split(" ").slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="card-team-horizontal">
      {image && (
        <Link
          href={`/teams/${slug}`}
          className="team-media no-underline"
          aria-label="Team details"
        >
          <Image
            src={image}
            alt={`Image of ${name}`}
            width={500}
            height={619}
            loading="lazy"
          />
        </Link>
      )}

      <div className="our-team-content section-headings-vertical">
        <div className="content-top">
          {name && (
            <h2 className="team-title heading text-28 fw-600">{name}</h2>
          )}
          {designation && (
            <h4 className="team-desig text text-20">{designation}</h4>
          )}
          {expertise && (
            <div className="team-desc text text-16">
              {turnCateWords(expertise, 6)}
            </div>
          )}
          <Link href={`/teams/${slug}`} className="team-btn button--cta">
            Get in Touch
          </Link>
        </div>
        {social && (
          <div className="social-list">
            {social.linkedin_url && (
              <Link
                href={social.linkedin_url}
                className="svg-wrapper"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Icons.LinkedIn className="icon icon-20" />
              </Link>
            )}

            {social.twitter_url && (
              <Link
                href={social.twitter_url}
                className="svg-wrapper"
                aria-label="Twitter"
                target="_blank"
              >
                <Icons.Twitter className="icon icon-20" />
              </Link>
            )}

            {social.instagram_url && (
              <Link
                href={social.instagram_url}
                className="svg-wrapper"
                aria-label="instagram"
                target="_blank"
              >
                <Icons.Instagram className="icon icon-20" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTeam2;
