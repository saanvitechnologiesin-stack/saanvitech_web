'use client';

import { FormType } from "@/types/form";

const Form = ({
    cls,
    onSubmitHandler,
    children
}: FormType) => {
    return (
        <form 
            className={cls}
            onSubmit={event => onSubmitHandler(event)} 
        >
            {children}
        </form>
    )
}

export default Form;