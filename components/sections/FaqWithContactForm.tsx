import { SectionProps } from "@/types/sectionProps";
import { FaqAccordion } from "@/data/faqAccordion";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Text from "../Text";
import FaqForm from "../FaqForm";
import Accordion from "../Accordion";


const FaqWithContactForm = ({ data }: { data: SectionProps }) => {
    const {        
        wrapperCls,
        container,
        subheading,
        heading,
        text
    } = data || {};

    return (
        <div className={`faq ${wrapperCls}`}>
            <div className={container}>
                <div className="grid grid-cols-2 lg:gap-1">
                    <div className="lg:col-span-1 col-span-2">
                        <div className="section-headings">
                            {subheading && 
                                <Subheading 
                                    title={subheading}
                                    cls="text-20"
                                    aos="fade-up"
                                />
                            }

                            {heading && 
                                <Heading 
                                    title={heading}
                                    cls="text-50"
                                    aos="fade-up"
                                    aosDelay="50"
                                />
                            }

                            {text && 
                                <Text 
                                    text={text}
                                    cls="text-16"
                                    aos="fade-up"
                                    aosDelay="80"
                                />
                            }

                            <FaqForm heading="Have any Question" />
                        </div>
                    </div>

                    <div className="lg:col-span-1 col-span-2">
                        <Accordion data={FaqAccordion} />
                    </div>
                </div>
            </div>
      </div>
    )
}

export default FaqWithContactForm;