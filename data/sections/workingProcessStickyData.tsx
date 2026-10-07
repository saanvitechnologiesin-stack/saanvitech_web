import { SectionProps } from "@/types/sectionProps";
import Icons from "@/components/Icons";

export const WorkingProcessStickyData: SectionProps = {
    wrapperCls: "mt-100",
    container: "container",
    subheading: "Working Process",
    heading: "How We Bring Your Ideas to Life",
    promotions: [
        {
            icon: <Icons.Discover />,
            title: "Listen & Discover",
            text: "We begin by deeply understanding your goals, challenges, and expectations. Through open discussion and guided questions, we uncover valuable insights that help shape the perfect strategy.",
        },
        {
            icon: <Icons.Analyze />,
            title: "Research & Analyze",
            text: "Our team dives deep into data, industry trends, and audience behavior to uncover real opportunities. We carefully analyze every detail, ensuring a clear understanding of your market and goals.",
        },
        {
            icon: <Icons.Strategy />,
            title: "Strategize & Plan ",
            text: "With clear insights, we develop a structured, results-focused roadmap. This strategy outlines goals, timelines, and steps, ensuring your project moves forward with direction, confidence, and measurable objectives.",
        },
        {
            icon: <Icons.Design />,
            title: "Design & Create ",
            text: "We craft innovative, customer-focused solutions tailored to your business needs. From creative concepts to seamless functional design, we blend strategy, creativity, and usability at every step.",
        },
        {
            icon: <Icons.Refine />,
            title: "Test & Refine ",
            text: "Before launch, we test everything thoroughly. We refine and optimize based on feedback and performance data, ensuring the final result is polished, effective, and aligned with your goals.",
        }
    ],
}