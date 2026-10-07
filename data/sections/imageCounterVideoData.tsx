import { SectionProps } from "@/types/sectionProps";

export const ImageCounterVideoData: SectionProps = {
  wrapperCls: "mt-100",
  container: "container",
  subheading: "About Us",
  heading: "Strategic Execution Powered by Creative Vision",
  button: {
    label: "More About Us",
    href: "/about-us",
    type: "primary",
  },
  counterData: [
    {
      number: 20,
      suffix: "k+",
      title: "Project completed",
      aos: "fade-up",
      aosDelay: 20,
    },
    {
      number: 12,
      suffix: "k+",
      title: "Happy customers",
    },
    {
      number: 25,
      suffix: "+",
      title: "Years experiences",
    },
  ],
};
