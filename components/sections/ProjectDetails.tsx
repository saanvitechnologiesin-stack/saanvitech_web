import "@/styles/blog.css";
import "@/styles/service-details.css";
import "@/styles/project-details.css";
import Image from "next/image";
import parse from 'html-react-parser';
import { formatDate } from "@/utils/formatDate";
import SidebarPhoneImage from "@/public/img/service/secvice-contact.jpg";

import { ProjectType } from "@/types/project";
import ProjectBlock from "../ProjectBlock";
import SidebarPhone from "../SidebarPhone";

const ProjectDetails = ({
    container,
    data
}: {
    container: string;
    data: ProjectType;
}) => {
    const {
        title,
        image,
        content,
        category,
        client,
        owner,
        starting_date,
        ending_date,
        website
    } = data || {};

    return (
        <div className="page-project-details mt-100 mb-100">
            <div className={container}>
                {image &&
                    <div className="project-media radius18" data-aos="fade-up">
                        <Image 
                            src={image}
                            width={1400} 
                            height={637} 
                            loading="lazy" 
                            alt="Image"
                        />
                    </div>
                }

                <div className="project-details-content">
                    <div className="grid grid-cols-12 lg:gap-1">
                        <div className="lg:col-span-7 col-span-12">
                            <div className="content-details-inner">
                                {title &&
                                    <h2 className="heading text-50" data-aos="fade-up">
                                        {title}
                                    </h2>
                                }

                                {content && <>{parse(content)}</>}
                            </div>
                        </div>

                        <div className="lg:col-span-5 col-span-12">
                            <div className="project-sidebar">
                                <div className="sidebar-widget project-info radius18" data-aos="fade-up">
                                   <h2 className="heading text-24">Project Information</h2>
                                   <ul className="project-info-list list-unstyled">
                                        {client &&
                                            <ProjectBlock 
                                                title="Client"
                                                text={client}
                                            />
                                        }
                                        
                                        {starting_date &&
                                            <ProjectBlock 
                                                title="Start Date"
                                                text={formatDate(starting_date)}
                                            />
                                        }
                                        
                                        {ending_date &&
                                            <ProjectBlock 
                                                title="End Date"
                                                text={formatDate(ending_date)}
                                            />
                                        }

                                        {owner &&
                                            <ProjectBlock 
                                                title="Owner"
                                                text={owner}
                                            />
                                        }

                                        {category &&
                                            <ProjectBlock 
                                                title="Category"
                                                text={category}
                                            />
                                        }

                                        {website &&
                                            <ProjectBlock 
                                                title="Website"
                                                text={website}
                                            />
                                        }
                                   </ul>
                                </div>


                                <SidebarPhone 
                                    heading="Contact with us <br/> for any advice"
                                    text="Need help? Talk to an expert"
                                    phone="+12345.6789.333"
                                    image={{
                                        src: SidebarPhoneImage.src,                      
                                        width: 1000,
                                        height: 929,
                                        loading: "lazy",
                                        alt: "image"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;