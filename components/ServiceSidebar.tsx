import Icons from "./Icons";
import Services from "@/data/services.json";
import SidebarPhoneImage from "@/public/img/service/secvice-contact.jpg";

import SidebarCategories from "./SidebarCategories";
import SidebarPhone from "./SidebarPhone";
import SidebarPdfDownload from "./SidebarPdfDownload";
import DrawerOpener from "./DrawerOpener";


const ServiceSidebar = ({ slug }: {slug?: string;}) => {
    const services = Services;
    const filteredServices = services.filter(item => item.slug != slug);
    const categories: string[] = Array.from(new Set(filteredServices.flatMap(service => service.title)));

    return (
        <div className="sidebar-filter drawer-service-sidebar">
            <div className="drawer-headings lg:!hidden" data-aos="fade-up">
                <div className="heading text-24">Filter</div>
                <DrawerOpener
                    cls="svg-wrapper menu-close"
                    data-drawer=".drawer-service-sidebar"
                >
                    <Icons.CloseCircle />
                </DrawerOpener>
            </div>

            <aside className="service-sidebar">
                {categories.length > 0 &&
                    <SidebarCategories 
                        title="Services List"
                        categories={categories}
                        rootUrl="/services"
                    />
                }

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
                
                <SidebarPdfDownload 
                    heading="Download Our Brochures"
                    text="Business is a marketing discipline focused on growing visibility organ (non-paid) technic required."
                />
            </aside>
        </div>
    )
}

export default ServiceSidebar;