import '@/styles/project.css';
import ProjectList from "@/data/projects.json";
import CardProject from "../CardProject";
import { SectionProjectsType } from '@/types/sectionPorject';

import Pagination from "../Pagination";
import NotFoundMsg from "../NotFoundMsg";

import Heading from "../Heading";
import Subheading from "../Subheading";
import Text from "../Text";

const Projects = ({
    wrapperCls,
    container,
    heading,
    subheading,
    text,
}: SectionProjectsType) => {
    const projectList = ProjectList;

    if(projectList.length == 0) {
        return <NotFoundMsg message="No projects found!" />
    }

    return (
        <div className={`page-projects ${wrapperCls}`}>
            {(heading || subheading || text) && (
                <div className="container">
                    <div className="section-headings text-center">
                        {subheading && (
                            <Subheading 
                                title={subheading}
                                cls="text-20"
                                aos="fade-up"
                            />
                        )}
                        {heading && (
                            <Heading 
                                title={heading}
                                cls="text-40"
                                aos="fade-up"
                            />
                        )}
                        {text && (
                            <Text 
                                text={text}
                                cls="text-18"
                                aos="fade-up"
                            />
                        )}
                    </div>
                </div>
            )}

            <div className={container}>
                {projectList.length === 1 ? (
                    <div className="single-project-container">
                        <div 
                            className="single-project-wrapper" 
                            data-aos="fade-up" 
                            data-aos-delay="100"
                        >
                            <CardProject data={projectList[0]} />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 sm:gap-1 product-grid">
                        {projectList.map((project, index) => (
                            <div 
                                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3" 
                                data-aos="fade-up" 
                                data-aos-delay={`${index + 1}00`} 
                                key={`project-list-${index}`}
                            >
                                <CardProject data={project} />
                            </div>
                        ))}
                    </div>
                )}
                
                {projectList.length > 8 && <Pagination />}
            </div>
        </div>
    )
}

export default Projects;