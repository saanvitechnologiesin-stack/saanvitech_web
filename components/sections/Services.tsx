import "@/styles/multicolumn.css";
import { ServiceSectionType } from "@/types/serviceSection";
import ServiceList from "@/data/services.json";
import CardService from "../CardService";
import NotFoundMsg from "../NotFoundMsg";

const Services = ({
    wrapperCls,
    container,
}: ServiceSectionType) => {
    const serviceList = ServiceList;

    if(serviceList.length == 0) {
        return <NotFoundMsg message="No services found" />;
    }

    return (
        <div className={`multicolumn multicolumn-page ${wrapperCls}`}>
            <div className={container}>
                    <div className="multicolumn-inner">
                        <div className="grid grid-cols-12 md:gap-1 product-grid">
                            {serviceList.map((service, index) => (
                                <div 
                                    className="xl:col-span-4 md:col-span-6 col-span-12" 
                                    data-aos="fade-up"
                                    key={`card-service-${index}`}
                                >                                    
                                    <CardService data={service} />
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Services;