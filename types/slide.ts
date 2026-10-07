import { ButtonProps } from "./button";

export interface SlideType {
  subheading?: string;
  heading?: string;
  text?: string;
  button?: {
    label: string;
    href: string;
    type: string;
  };
  image: string,
  imageTablet?: string;
  imageMobile?: string;
  thumb?: string;
}

export interface SlideWithThumbType {
  image?: string;
  thumb?: string;
}
