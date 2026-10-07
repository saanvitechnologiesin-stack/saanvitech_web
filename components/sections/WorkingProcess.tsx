import "@/styles/recent-project.css";
import "@/styles/card-working-process.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ServiceList from "@/data/services.json";
import CardTextIcon from "../CardTextIcon";
import { SectionProps } from "@/types/sectionProps";


const WorkingProcess = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        text,
        promotions
    } = data || {};

    return (
        <div className={`working-process recent-project ${wrapperCls}`}>
            <div className={container}>
                <div className="section-headings section-headings-horizontal">
                    <div className="section-headings-left">
                        {subheading && 
                            <Subheading 
                                title={subheading}
                                cls="text-20"
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
                        <div
                            className="section-headings-right text text-18"
                            data-aos="fade-left"
                        >
                            {text}
                        </div>
                    }
                </div>

                <div className="section-content">
                    <div className="grid grid-cols-12 gap-1 xl:gap-[100px] product-grid">
                        {promotions?.map((item, index) => (                        
                            <div 
                                className="col-span-12 md:col-span-6 lg:col-span-4" 
                                data-aos="fade-up" 
                                key={`card-working-${index}`}
                            >
                                <CardTextIcon data={item} />
                            </div>
                        ))}                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkingProcess;