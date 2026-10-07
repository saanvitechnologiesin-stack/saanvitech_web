import { PromotionProps } from '@/types/promotionProps';

const CardTextIcon = ({ data }: { data: PromotionProps }) => {
    const {
        icon,
        title,
        text,
    } = data || {};

    return (
        <div className="card-working-process">                  
            {title && <h2 className="heading text-20 fw-500">{title}</h2>}
            <div className="card-icon-text card-icon-text-horizontal has-border">
                {icon && <div className="svg-wrapper">{icon}</div>}
                {text && 
                    <div className="content">
                        <p className="text text-16">{text}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardTextIcon;