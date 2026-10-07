import { SlideWithThumbType } from "./slide";
import Icons from "@/components/Icons";
import { ButtonProps } from "./button";

export interface BannerSliderType {
    backgroundImage: string;
    wrapperCls?: string;
    subheading?: string;
    heading?: string;
    styledText?: string;
    text?: string;
    logoIconName?: keyof typeof Icons;
    button?: ButtonProps;
    phone?: string;
    slides: SlideWithThumbType[];
    navigation?: boolean;
}