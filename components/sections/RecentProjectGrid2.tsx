import "@/styles/project.css";
import "@/styles/recent-project.css";
import Heading from "../Heading";
import Subheading from "../Subheading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { SectionProps } from "@/types/sectionProps";
import ProjectList from "@/data/projects.json";
import CardProject from "../CardProject";

const RecentProjectGrid2 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, subheading, heading, button } =
    data || {};

  const projectList = ProjectList;

  if (projectList.length == 0) return null;

  return (
    <div className={`recent-project project-grid ${wrapperCls}`}>
      <div className={container}>
        <div className="section-headings section-headings-horizontal">
          <div className="section-headings-left">
            {subheading && (
              <Subheading title={subheading} cls="text-20" aos="fade-right" />
            )}
            {heading && (
              <Heading title={heading} cls="text-50" aos="fade-right" />
            )}
          </div>
          {button && (
            <>
              {button.type == "primary" && (
                <PrimaryButton
                  label={button.label}
                  href={button.href}
                  ariaLabel={button.label}
                />
              )}

              {button.type == "secondary" && (
                <SecondaryButton
                  label={button.label}
                  href={button.href}
                  ariaLabel={button.label}
                />
              )}
            </>
          )}
        </div>
        <div className="project-media">
          <div className="grid grid-cols-12 gap-1 product-grid justify-center">
            {ProjectList.slice(0, 1).map((project, index) => (
              <div
                className="lg:col-span-5 md:col-span-6 col-span-12"
                key={`project-list-${index}`}
              >
                <CardProject data={project} />
              </div>
            ))}

            {ProjectList.slice(1, 2).map((project, index) => (
              <div
                className="lg:col-span-7 md:col-span-6 col-span-12"
                key={`project-list-${index}`}
              >
                <CardProject data={project} />
              </div>
            ))}

            {ProjectList.slice(2, 5).map((project, index) => (
              <div
                className="lg:col-span-4 md:col-span-6 col-span-12"
                data-aos="fade-up"
                key={`project-list-${index}`}
              >
                <CardProject data={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProjectGrid2;
