import Link from "next/link";
import { ServiceDataType } from "@/types/service";
import Icons from "./Icons";
import parser from "html-react-parser";

const CardService = ({ data }: ServiceDataType) => {
    const { 
        title,
        description,
        slug,
        list,
        icon,
    } = data || {};

    return (        
        <Link
            className="multicolumn-card"
            href={`/services/${slug}`}
            aria-label="View Service Details"
        >
            {icon && <div className="card-icon icon-40">{parser(icon)}</div>}

            {title && <h2 className="heading text-28">{title}</h2>}

            {description && <div className="text text-16">{description}</div>}

            {list &&
                <ul className="text-lists list-unstyled">
                    {list.map((item, index) => (                        
                        <li className="text-item text text-16 fw-500" key={`service-${index}`}>
                            <Icons.Plus />
                            {item.title}
                        </li>
                    ))}
                </ul>
            }
        </Link>
    )
}

export default CardService;