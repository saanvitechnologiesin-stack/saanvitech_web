import { InputType } from "@/types/input";

const TextField = ({
    id,
    wrapperCls,
    cls,
    label,
    type,
    placeholder,
    name,
    required,
    maxLength,
    pattern,
    inputMode,
    onInput,
    aos,
    aosAnchor,
}: InputType) => {
    const requiredAttribute = required ? { required: true } : {};
    const isAos = aos ? { 'data-aos': `${aos}` } : null;
    const isAosAnchor = aosAnchor ? { 'data-aos-anchor': `${aosAnchor}` } : null;
    const conditionalAttributes = {...isAos, ...isAosAnchor};

    return(
        <div className={`field ${wrapperCls}`} {...conditionalAttributes}>
            <label htmlFor={id} className="visually-hidden">
                {label}
            </label>
            <input
                id={id}
                className={`${cls}`}
                type={type}
                placeholder={placeholder}
                name={name}
                maxLength={maxLength}
                pattern={pattern}
                inputMode={inputMode}
                onInput={onInput}
                {...requiredAttribute}
            />
        </div>
    )
}

export default TextField;