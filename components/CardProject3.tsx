import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { ProjectDataType } from "@/types/project";

const CardProject3 = ({ data }: ProjectDataType) => {
  const { slug, title, shortDesc, image } = data || {};

  return (
    <Link
      href={`/projects/${slug}`}
      className="card-recent-project no-underline radius4"
      aria-label="Project Card"
    >
      {image && (
        <Image
          src={image}
          alt={`Image of ${title}`}
          width={1400}
          height={637}
          loading="lazy"
        />
      )}
      <div className="content-recent-project section-headings-vertical">
        <div className="content-top">
          <h2 className="heading text-28 fw-500">{title}</h2>
          {shortDesc && <p className="text text-18">{shortDesc}</p>}
        </div>
        <div className="button--cta">View Details</div>
      </div>
    </Link>
  );
};

export default CardProject3;
