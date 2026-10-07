import { SlideType } from "./slide";

export interface HeroSliderType {
  wrapperCls?: string;
  slides: SlideType[];
  navigation?: boolean;
}