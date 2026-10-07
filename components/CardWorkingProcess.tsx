import { PromotionProps } from "@/types/promotionProps";

const CardWorkingProcess = ({ data }: { data: PromotionProps }) => {
  const { icon, title, text } = data || {};

  return (
    <div className="card-working-process">
      {title && <h2 className="heading text-24 fw-500">{title}</h2>}
      <div className="card-icon-text card-icon-text-horizontal has-border">
        {icon && <div className="svg-wrapper">{icon}</div>}
        <div className="content">
          {text && (
            <div className="content">
              <p className="text text-18">{text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardWorkingProcess;
