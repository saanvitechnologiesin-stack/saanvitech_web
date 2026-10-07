import { HeadingType } from "@/types/heading";

const Heading = ({
    title,
    styledText,
    styledTextCls,
    aos,
    aosAnchor,
    aosDelay,
    cls,
}: HeadingType) => {
    const isAos = aos ? { 'data-aos': `${aos}` } : null;
    const isAosAnchor = aosAnchor ? { 'data-aos-anchor': `${aosAnchor}` } : null;
    const isAosDelay = aosDelay ? { 'data-aos-delay': `${aosDelay}` } : null;
    const conditionalAttributes = {...isAos, ...isAosAnchor, ...isAosDelay};
    
    // Split the title around the decorated text
    if(styledText) {
        const parts = title.split(new RegExp(`(${styledText})`, "gi"));

        return (
            <h2 className={`heading ${cls}`} {...conditionalAttributes}>
                {parts.map((part, index) =>
                    part.toLowerCase() === styledText.toLowerCase() ? (
                    <span key={index} className={styledTextCls}>
                        <span>{part}</span>
                    </span>
                    ) : (
                    part
                    )
                )}
            </h2>
        )
    }

    return (
        <h2 className={`heading ${cls}`} {...conditionalAttributes}>
            {title}
        </h2>
    )
}

export default Heading;