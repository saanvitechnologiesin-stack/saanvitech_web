import "@/styles/recent-project.css";
import "@/styles/card-working-process.css";
import "@/styles/testimonial.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import CardWorkingProcess from "../CardWorkingProcess";
import { SectionProps } from "@/types/sectionProps";

const WorkingProcessSticky = ({ data }: { data: SectionProps }) => {
  const { wrapperCls,container, subheading, heading, promotions } = data || {};

  return (
    <div className={`testimonial how-we-work ${wrapperCls}`}>
      <div className={container}>
        <div className="grid grid-cols-12 gap-1">
          <div className="lg:col-span-6 col-span-12">
            <div className="section-headings section-headings-sticky">
              {subheading && (
                <Subheading title={subheading} cls="text-20" aos="fade-up" />
              )}
              {heading && (
                <Heading
                  title={heading}
                  cls="text-50"
                  aos="fade-up"
                  aosDelay="100"
                />
              )}
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="testimonial-card-inner card-working-process-inner">
              {promotions?.map((item, index) => (
                <CardWorkingProcess data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingProcessSticky;
