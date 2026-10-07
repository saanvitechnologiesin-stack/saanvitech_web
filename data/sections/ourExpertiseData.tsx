import { SectionProps } from "@/types/sectionProps";
import Image1 from "@/public/img/project/1.jpg";
import Image2 from "@/public/img/project/2.jpg";
import Image3 from "@/public/img/project/3.jpg";

export const OurExpertiseData: SectionProps = {
  wrapperCls: "mt-100",
  container: "container",
  subheading: "Our Expertise",
  heading: "Solutions tailored to your business needs",
  blockList: [
    {
      subheading: "Investment Idea",
      heading: "Innovation meets business needs",
      textList: [
        {
          text: "Smart solutions for modern businesses",
        },
        {
          text: "Creative thinking backed by strategy",
        },
        {
          text: "Turning strategy into business growth",
        },
      ],
      button: {
        label: "Learn More",
        href: "/projects",
        type: "primary",
      },
      image: {
        src: Image1.src,
        width: 1000,
        height: 707,
        loading: "lazy",
        alt: "Image",
      },
    },
    {
      subheading: "Risk Management",
      heading: "Protecting business from uncertainty",
      textList: [
        {
          text: "Reducing risk, strengthening your future",
        },
        {
          text: "Smart protection for business success",
        },
        {
          text: "Helping you navigate business uncertainty",
        },
      ],
      button: {
        label: "Learn More",
        href: "/projects",
        type: "primary",
      },
      image: {
        src: Image2.src,
        width: 1000,
        height: 707,
        loading: "lazy",
        alt: "Image",
      },
    },
    {
      subheading: "Business Growth",
      heading: "Redesigning business for solutions",
      textList: [
        {
          text: "Designing better solutions for growth",
        },
        {
          text: "Smart solutions built for business growth",
        },
        {
          text: "Confidence and stability for businesses",
        },
      ],
      button: {
        label: "Learn More",
        href: "/projects",
        type: "primary",
      },
      image: {
        src: Image3.src,
        width: 1000,
        height: 707,
        loading: "lazy",
        alt: "Image",
      },
    },
  ],
};
