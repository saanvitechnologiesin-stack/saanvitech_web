import { ButtonProps } from "./button";
import { ImageProps } from "./image";
import { TextProps } from "./text";
import { BlockListProps } from "./blocks";

import { PromotionProps } from "@/types/promotionProps";
import { CounterItemProps } from "./counterItemProps";

export interface SectionProps {
    wrapperCls?: string;
    container?: string;
    subheading?: string;
    heading?: string;
    styledText?: string;
    styledTextCls?: string;
    text?: string;
    text2?: string;
    link?: string;
    button?: ButtonProps;
    button2?: ButtonProps;
    primaryButton?: ButtonProps;
    secondaryButton?: ButtonProps;
    block?: {
        subheading?: string;
        heading?: string;
        headingSup?: string;
        text?: string;
        button?: ButtonProps;
        button2?: ButtonProps;
    };
    blockList?: BlockListProps[];
    image?: ImageProps;
    promoImage?: ImageProps;
    backgroundImage?: ImageProps;
    imageList?: ImageProps[];
    imageList2?: ImageProps[];
    promotions?: PromotionProps[];
    counterData?: CounterItemProps[];
    textList?: TextProps[];
    rotatingLogo?: {
        logo?: any;
        text?: string;
    },
}