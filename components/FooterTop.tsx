import { QuickLink } from "@/data/footerMenuList";

import FooterBrand from "./FooterBrand";
import FooterMenu from "./FooterMenu";
import FooterConnectContact from "./FooterConnectContact";
import FooterAddress from "./FooterAddress";

interface FooterTopProps {
    container: string;
}

const FooterTop = ({
    container,
}: FooterTopProps) => {
    return (
        <div className="footer-top">
          <div className={container}>
            <div className="grid max-lg:grid-cols-12 md:max-lg:gap-x-3 footer-custom-row">
              <div className="max-md:col-span-12 max-lg:col-span-6 footer-col-brand">
                <FooterBrand />
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6 footer-col-links">
                <FooterMenu 
                    heading="Quick Links"
                    menus={QuickLink}
                />
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6 footer-col-connect">
                <FooterConnectContact />
              </div>
              <div className="max-md:col-span-12 max-lg:col-span-6 footer-col-address">
                <FooterAddress />
              </div>
            </div>
          </div>
        </div>
    )
}

export default FooterTop;