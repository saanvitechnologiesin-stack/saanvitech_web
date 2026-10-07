import LinkList from "./LinkList";
import { MenuType } from "@/types/menu";

interface FooterMenuProps {
    heading: string;
    menus: MenuType[];
}

const FooterMenu = ({
    heading,
    menus,
}: FooterMenuProps) => {
    return (
        <div
            className="footer-widget footer-widget-menu"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            <div className="widget-heading heading text-22">{heading}</div>            
                <LinkList 
                    wrapperCls="footer-menu"
                    menus={menus}
                />
        </div>
    )
}

export default FooterMenu;