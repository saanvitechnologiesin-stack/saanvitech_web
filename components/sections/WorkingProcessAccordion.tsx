import "@/styles/recent-project.css";
import "@/styles/card-working-process.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import CardTextIcon from "../CardTextIcon";
import Accordion from "../Accordion";
import { WorkingProcessFaq } from "@/data/workingProcessFaqData";
import { SectionProps } from "@/types/sectionProps";
import ThemeModalVideo from "../ThemeModalVideo";


const WorkingProcessAccordion = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text, 
    } = data || {};

    return (
        <div className={`faq faq-2 ${wrapperCls}`}>
          <div className={container}>
            <div className="section-headings section-headings-horizontal">
                <div className="section-headings-left">
                    {subheading && 
                        <Subheading 
                            title={subheading}
                            cls="text-20 subheading-bg"
                            aos="fade-right"
                        />
                    }                        

                    {heading && 
                        <Heading 
                            title={heading}
                            cls="text-50"
                            aos="fade-right"
                        />
                    }
                </div>
                {text && 
                    <div className="section-headings-right">
                        <div
                            className="text text-18"
                            data-aos="fade-up"
                            data-aos-delay="80"
                        >
                            {text}
                        </div>
                    </div>
                }
            </div>
            <div className="section-content">
              <div className="grid grid-cols-12 gap-1">
                <div className="lg:col-span-6 col-span-12">
                    <ThemeModalVideo 
                        cls="section-headings-sticky" 
                        video="/videos/video.mp4"
                        image="/img/service/secvice-contact.jpg"
                    />
                </div>
                <div className="lg:col-span-6 col-span-12">
                    <Accordion data={WorkingProcessFaq} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default WorkingProcessAccordion;