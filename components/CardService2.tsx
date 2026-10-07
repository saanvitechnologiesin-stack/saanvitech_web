import Link from "next/link";
import Image from 'next/image';
import { ServiceDataType } from "@/types/service";
import Icons from "./Icons";
import parser from "html-react-parser";

const CardService2 = ({ data }: ServiceDataType) => {
    const { 
        title,
        description,
        slug,
        icon,
        image,
    } = data || {};

    return (
        <Link href={`/services/${slug}`} className="card-service radius18" aria-label="Service Card">
            {image &&
                <Image
                    src={image}
                    alt="service image"
                    width={1000}
                    height={596}
                    loading="lazy"
                />
            }

            <div className="card-service-content-absolute">
                <div className="card-service-content">
                    <div className="card-working-process">                  
                        {title && <h2 className="heading text-24 fw-500">{title}</h2>}
                        
                        <div className="card-icon-text card-icon-text-horizontal">
                            {icon && <div className="svg-wrapper">{parser(icon)}</div>}

                            {description && 
                            <div className="content">
                                <p className="text text-16">{description}</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardService2;