import "@/styles/project.css";
import "@/styles/recent-project.css";
import Heading from "../Heading";
import Subheading from "../Subheading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { SectionProps } from "@/types/sectionProps";
import ProjectList from "@/data/projects.json";
import CardProject2 from "../CardProject2";

const RecentProjectGrid4 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, subheading, heading, button } = data || {};

  const projectList = ProjectList;

  if (projectList.length == 0) return null;

  return (
    <div className={`recent-project project-grid mt-100 ${wrapperCls}`}>
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
          <div className="grid grid-cols-12 gap-1 justify-center">
            {ProjectList.slice(0, 4).map((project, index) => (
              <div
                className={`${index == 0 || index == 3 ? "lg:col-span-5" : "lg:col-span-7"} col-span-12 `}
                key={`project-list-${index}`}
                data-aos="fade-up"
              >
                <CardProject2 data={project} />
              </div>
            ))}
          </div>
        </div>
        <div className="section-button" data-aos="fade-up">
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
      </div>
    </div>
  );
};

export default RecentProjectGrid4;
