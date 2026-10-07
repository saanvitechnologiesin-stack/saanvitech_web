import { ButtonProps } from "./button";
import { ImageProps } from "./image";

export interface BlockListProps {
    subheading?: string;
    heading?: string;
    text?: string;
    textList?: any;
    button?: ButtonProps;
    image?: ImageProps;
}