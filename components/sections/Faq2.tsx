import { SectionProps } from "@/types/sectionProps";
import { WorkingProcessFaq } from "@/data/workingProcessFaqData";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Accordion2 from "../Accordion2";

const Faq2 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, subheading, heading } = data || {};

  return (
    <div className={`faq-2 faq-working-process section-padding ${wrapperCls}`}>
      <div className={container}>
        <div className="section-headings headings-width text-center">
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
        <div className="section-content">
          <Accordion2 data={WorkingProcessFaq} />
        </div>
      </div>
    </div>
  );
};

export default Faq2;
