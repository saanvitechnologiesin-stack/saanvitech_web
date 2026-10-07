import { 
    QuickLink,
    Services,
    MenuContact,
    Information
} from "../data/footerMenuList";

import FooterBrand2 from "./FooterBrand2";
import FooterNewsletter2 from "./FooterNewsletter2";
import FooterMenu from "./FooterMenu";

interface FooterTopProps {
    container: string;
}

const FooterTop4 = ({
    container,
}: FooterTopProps) => {
    return (
        <div className="footer-top">
          <div className={container}>
            <div className="logo-with-newsletter">
              <div className="grid grid-cols-12 gap-1 product-grid justify-between items-center">
                <div className="col-span-12 md:col-span-6 xl:col-span-8">
                  <div
                    className="footer-widget footer-widget-brand"
                    data-aos="fade-right"
                    data-aos-anchor=".footer-top"
                  >
                   <FooterBrand2 />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <FooterNewsletter2 />
                </div>
              </div>
            </div>
            <div className="separetor"></div>
            <div className="grid max-lg:grid-cols-12 gap-1 footer-custom-row">
              <div className="max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-3">
                <FooterMenu 
                  heading="Contact"
                  menus={MenuContact}
                />
              </div>
              <div className="max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-3">                
                <FooterMenu 
                  heading="Quick Link"
                  menus={QuickLink}
                />
              </div>
              <div className="max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-3">
                <FooterMenu 
                  heading="Services"
                  menus={Services}
                />
              </div>
              <div className="max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-3">
                <FooterMenu 
                  heading="Information"
                  menus={Information}
                />
              </div>
            </div>
          </div>
        </div>
    )
}

export default FooterTop4;