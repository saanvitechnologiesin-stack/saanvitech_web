import "@/styles/promotion.css";
import "@/styles/recent-project.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import CounterUp2 from "./CounterUp2";
import ThemeModalVideo from "../ThemeModalVideo";

import { CounterUpData2 } from "@/data/sections/counterUpData2";


const WhyChooseUs4 = ({ data }: { data: SectionProps }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        counterData
    } = data || {};

    return (
        <div className={`working-process recent-project has-video ${wrapperCls}`}>
        <div className={container}>
          <div className="section-headings headings-width text-center">
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
                    aosDelay="100"
                />
            }
          </div>
          <div className="section-content">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-1">
             {counterData && <CounterUp2 data={CounterUpData2} />}
              <div className="col-span-1 multi-col m-0!" data-aos-delay="fade-up">
                  <ThemeModalVideo
                        video="/videos/video.mp4"
                        image="/img/service/secvice-contact.jpg"                        
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default WhyChooseUs4;