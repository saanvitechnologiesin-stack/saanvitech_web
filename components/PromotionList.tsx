import parser from "html-react-parser";
import { PromotionProps } from "@/types/promotionProps";

const PromotionList = ({ items }: { items: PromotionProps[] }) => {
  return (
    <ul className="promotion-lists list-unstyled">
      {items.map((item, index) => (
        <li
          className="promotion-item"
          data-aos="fade-up"
          key={`plist-${index}`}
        >
          <div className="promotion-title">
            {item.icon && <span className="icon-50">{item.icon}</span>}

            {item.title && (
              <div className="text text-18 fw-600">{parser(item.title)}</div>
            )}
          </div>

          {item.text && (
            <div className="promotion-text text text-16">
              {parser(item.text)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PromotionList;
