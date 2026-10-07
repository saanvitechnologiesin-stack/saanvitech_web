import { TextProps } from "@/types/text";

const Text = ({
    text,
    aos,
    aosAnchor,
    aosDelay,
    cls,
}: TextProps) => {
    const isAos = aos ? { 'data-aos': `${aos}` } : null;
    const isAosAnchor = aosAnchor ? { 'data-aos-anchor': `${aosAnchor}` } : null;
    const isAosDelay = aosDelay ? { 'data-aos-delay': `${aosDelay}` } : null;
    const conditionalAttributes = {...isAos, ...isAosAnchor, ...isAosDelay}

    return (
        <p className={`text ${cls}`} {...conditionalAttributes}>
            {text}
        </p>
    )
}

export default Text;