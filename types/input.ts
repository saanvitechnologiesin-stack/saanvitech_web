export interface InputType {
    id: string;
    label: string;
    wrapperCls?: string;
    cls?: string;
    type?: string;
    placeholder: string;
    name: string;
    required?: boolean;
    maxLength?: number;
    pattern?: string;
    inputMode?: any;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    aos?: string;
    aosAnchor?: string;
}