import Icons from "./Icons";
import { SubheadingType } from "@/types/subheading";

const Subheading = ({
    title,
    icon = true,
    aos,
    aosAnchor,
    cls,
}: SubheadingType) => {
    const isAos = aos ? { 'data-aos': `${aos}` } : null;
    const isAosAnchor = aosAnchor ? { 'data-aos-anchor': `${aosAnchor}` } : null;
    const conditionalAttributes = {...isAos, ...isAosAnchor};

    return (
        <div className={`subheading subheading-bg ${cls}`} {...conditionalAttributes}>
            {icon && <span className="icon icon-14"><Icons.Subheading /></span>}
            <span>{title}</span>
            {icon && <span className="icon icon-14"><Icons.Subheading /></span>}
        </div>
    )
}

export default Subheading;