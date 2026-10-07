import { ImageProps } from "./image";

export interface ServiceSectionType {
    wrapperCls?: string;
    container?: string;
    backgroundImage?: ImageProps;
    subheading?: string;
    heading?: string;
    button?: {
        label: string;
        href: string;
        type: string;
    };
}