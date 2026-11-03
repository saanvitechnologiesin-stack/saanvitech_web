import "@/styles/blog.css";
import "@/styles/service-details.css";
import "@/styles/project-details.css";
import Image from "next/image";
import parse from 'html-react-parser';
import SidebarPhoneImage from "@/public/img/service/secvice-contact.jpg";

import { ProjectType } from "@/types/project";
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
        mockup_image
    } = data || {};

    return (
        <div className="page-project-details mt-100 mb-100">
            <div className={container}>
                <div className="grid grid-cols-12 lg:gap-1">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="project-details-content">
                            {image &&
                                <div className="details-media radius18" data-aos="fade-up">
                                    <Image
                                        src={image}
                                        width={1000}
                                        height={596}
                                        loading="lazy"
                                        alt={title || "Product Image"}
                                    />
                                </div>
                            }

                            {title &&
                                <h2 className="heading text-40" data-aos="fade-up">
                                    {title}
                                </h2>
                            }

                            {content && <>{parse(content)}</>}
                        </div>
                    </div>

                    <div className="lg:col-span-5 col-span-12">
                        <div className="project-sidebar">
                            {mockup_image && (
                                <div className="sidebar-widget project-sidebar-mockup radius18" data-aos="fade-up">
                                    <Image
                                        src={mockup_image}
                                        width={1920}
                                        height={1080}
                                        alt="Web Dashboard Mockup"
                                        className="sidebar-mockup-img"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            <SidebarPhone
                                heading="Contact with us <br/> for any advice"
                                text="Need help? Talk to an expert"
                                phone="+91 70191 94859"
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
    )
}

export default ProjectDetails;