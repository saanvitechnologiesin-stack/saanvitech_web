import Link from "next/link";
import { ServiceDataType } from "@/types/service";
import Icons from "./Icons";
import parser from "html-react-parser";

const CardService3 = ({ data }: ServiceDataType) => {
  const { title, description, slug, list, icon } = data || {};

  return (
    <Link
      href={`/services/${slug}`}
      className="card-working-process no-underline block height-100"
      aria-label="View Service Details"
    >
      <div className="flex gap-1 items-center">
        {icon && <div className="card-icon icon-40">{parser(icon)}</div>}

        {title && <h2 className="heading text-20 fw-500">{title}</h2>}
      </div>
      <div className="card-icon-text has-border">
        <div className="content">
          {description && <div className="text text-16">{description}</div>}

          {list && (
            <ul className="text-lists mt-0.5! list-unstyled">
              {list.map((item, index) => (
                <li
                  className="text-item text text-16 fw-500"
                  key={`service-${index}`}
                >
                  <Icons.Plus />
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardService3;
