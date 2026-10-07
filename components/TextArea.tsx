import { InputType } from "@/types/input";

const TextArea = ({
    id,
    wrapperCls,
    cls,
    label,
    placeholder,
    name,
    required,
    aos,
    aosAnchor,
}: InputType) => {
    const requiredAttribute = required ? {'reuired': 'true'} : null;
    const isAos = aos ? { 'data-aos': `${aos}` } : null;
    const isAosAnchor = aosAnchor ? { 'data-aos-anchor': `${aosAnchor}` } : null;
    const conditionalAttributes = {...isAos, ...isAosAnchor};

    return(
        <div className={`field ${wrapperCls}`} {...conditionalAttributes}>
            <label htmlFor={id} className="visually-hidden">
                {label}
            </label>
            <textarea
                id={id}
                className={`text ${cls}`}
                placeholder={placeholder}
                name={name}
                rows={4}
                {...requiredAttribute}
            ></textarea>
        </div>
    )
}

export default TextArea;