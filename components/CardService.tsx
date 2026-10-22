import { ServiceDataType } from "@/types/service";
import Icons from "./Icons";
import parser from "html-react-parser";
import PrimaryButton from "./buttons/PrimaryButton";

const CardService = ({ data }: ServiceDataType) => {
    const { 
        title,
        description,
        slug,
        list,
        icon,
    } = data || {};

    return (        
        <div className="multicolumn-card">
            {icon && <div className="card-icon icon-40">{parser(icon)}</div>}

            {title && <h2 className="heading text-20">{title}</h2>}

            {description && <div className="text text-15">{description}</div>}

            {list &&
                <ul className="text-lists list-unstyled">
                    {list.map((item, index) => (                        
                        <li className="text-item text text-15 fw-500" key={`service-${index}`}>
                            <Icons.Plus />
                            {item.title}
                        </li>
                    ))}
                </ul>
            }

            {slug && (
                <div className="card-service-button">
                    <PrimaryButton 
                        label="Explore"
                        href={`/services/${slug}`}
                        ariaLabel={`Explore ${title || 'Service'}`}
                    />
                </div>
            )}
        </div>
    )
}

export default CardService;