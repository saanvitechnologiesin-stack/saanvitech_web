import "@/styles/project.css";
import "@/styles/recent-project.css";
import Heading from "../Heading";
import Subheading from "../Subheading";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { SectionProps } from "@/types/sectionProps";
import ProjectList from "@/data/projects.json";
import CardProject from "../CardProject";

const RecentProjectGrid3 = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, subheading, heading, button } =
    data || {};

  const projectList = ProjectList;

  if (projectList.length == 0) return null;

  return (
    <div className={`recent-project project-grid mt-100 ${wrapperCls}`}>
      <div className="container-fluid">
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

        <div className="project-media" data-aos="fade-up">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 justify-center">
            {ProjectList.slice(0, 6).map((project, index) => (
              <div
                className="col-span-1 multi-col m-0!"
                key={`project-list-${index}`}
              >
                <CardProject data={project} />
              </div>
            ))}
          </div>
        </div>

        <div className="section-headings text-center">
          <div className="buttons" data-aos="fade-up">
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
    </div>
  );
};

export default RecentProjectGrid3;
