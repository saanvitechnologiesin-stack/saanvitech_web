import Icons from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { ProjectDataType } from '@/types/project';

const CardProject = ({ data }: ProjectDataType) => {
    const { 
        slug,
        title,
        category,
        image
    } = data || {};

    return (
        <Link
            className="card-project radius18"
            aria-label="project details"
            href={`/projects/${slug}`}
        >
            {image &&
                <Image
                    src={image}
                    alt={`Image of ${title}`}
                    width={1400}
                    height={637}
                    loading="lazy"
                />
            }

            <div className="card-project-content-absolute">
                <div className="card-project-content">
                    {title && <h2 className="heading text-24">{title}</h2>}
                    {category && <p className="text text-16">{category}</p>}
                </div>
            </div>

            <span className="svg-wrapper icon-project-link">
                <Icons.ArrowRotate2 />
            </span>
        </Link>
    )
}

export default CardProject;