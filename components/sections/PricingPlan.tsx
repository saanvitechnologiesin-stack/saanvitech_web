import "@/styles/image-with-text.css";
import "@/styles/pricing-plan.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Subheading from "../Subheading";
import { PricingTableData } from "@/data/pricingTableData";
import CardPricing from "../CardPricing";
import Image from "next/image";


const PricingPlan = ({ data }: { data: SectionProps }) => {
    const pricingTable = PricingTableData;
    if (pricingTable.length == 0) return null;

    const {
        wrapperCls,
        container,
        subheading,
        heading,
        backgroundImage,
    } = data || {};

    return (
        <div className={`pricing-plan ${wrapperCls}`}>
            {backgroundImage &&
                <div className="media media-bg">
                    <Image
                        src={backgroundImage.src}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        loading={backgroundImage.loading}
                        alt={backgroundImage.alt ? backgroundImage.alt : 'bg image'}
                    />
                </div>
            }
            <div className={container}>
                <div className="section-headings text-center">
                    {subheading &&
                        <Subheading 
                            title={subheading}
                            cls="text-20"
                            aos="fade-up"
                        />
                    }

                    {heading &&
                        <Heading 
                            title={heading}
                            cls="text-50"
                            aos="fade-up"
                        />
                    }         
                </div>

                <div className="section-content">
                    <div className="pricing-cards">
                        <div className="grid grid-cols-3 gap-1 product-grid justify-center">
                            {pricingTable.map((item, index) => (
                                <div className="col-span-3 xl:col-span-1" key={`price-box-${index}`}>
                                    <CardPricing data={item} />
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PricingPlan;