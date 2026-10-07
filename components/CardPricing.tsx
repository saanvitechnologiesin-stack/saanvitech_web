import Icons from "./Icons";
import Link from "next/link";
import { PricingProps } from "@/types/pricing";

const CardPricing = ({
  data,
  buttonType,
}: {
  data: PricingProps;
  buttonType?: string;
}) => {
  const { title, description, price, period, features, link, active } =
    data || {};

  return (
    <div className={`card-pricing radius18 ${active ? "active" : ""}`}>
      <div className="card-pricing-headings radius18" data-aos="fade-up">
        {title && <h2 className="heading text-24">{title}</h2>}
        {description && <p className="text text-16">{description}</p>}

        <div className="pricing-box">
          <span className="subheading text-50 fw-600">{price}</span>
          {period && (
            <span className="subheading subheading-monthly text-16 fw-400">
              {period}
            </span>
          )}
        </div>
      </div>

      {features && (
        <ul className="text-lists list-unstyled">
          {features.map((item, index) => (
            <li
              className="text-item text text-18"
              data-aos="fade-up"
              key={`ft-${index}`}
            >
              <Icons.Check />
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="buttons" data-aos="fade-up">
        <Link
          href={link ? link : "#"}
          className={`button button--${buttonType ? buttonType : "primary"}`}
          aria-label="More About Us"
        >
          Choose Package
          <Icons.ArrowRotate />
        </Link>
      </div>
    </div>
  );
};

export default CardPricing;
