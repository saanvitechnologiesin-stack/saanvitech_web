import Icons from "./Icons";
import Link from "next/link";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo.png";
import { MenuService, MenuContact } from "@/data/drawerMenus";
import DrawerOpener from "./DrawerOpener";

const AdditionalDrawer = () => {
    return (
        <div className="theme-drawer drawer-additional" data-position="right">
            <div className="drawer-headings">
                <Logo 
                    src={LogoImage.src}
                    width={189}
                    height={32}
                    url="/"
                    cls="header-logo"
                    alt="Consulo logo"
                    ariaLabel="Consulo logo" 
                    loading="lazy"
                />

                <DrawerOpener
                    cls="svg-wrapper menu-close"
                    data-drawer=".drawer-additional"
                >
                    <Icons.CloseCircle />
                </DrawerOpener>
            </div>
            <div className="drawer-content">
                <div className="drawer-block">
                    <div className="drawer-heading text text-18">{MenuService.title}</div>
                    <ul className="drawer-additional-menu list-unstyled flex-col">
                        {MenuService.menus.map((item, index) => (
                            <li className="nav-item" key={`MenuService-${index}`}>
                                <Link className="menu-link" href={item.path}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="drawer-block drawer-block-contact">
                    <div className="drawer-heading text text-18">{MenuContact.title}</div>
                    <ul className="drawer-additional-menu list-unstyled flex-col">
                        {MenuContact.menus.map((item, index) => (
                            <li className="nav-item" key={`MenuContact-${index}`}>
                                {item.path == null ? (
                                    <div className="menu-link no-hover">
                                        {item.icon}
                                        {item.title}
                                    </div>
                                ) : (
                                    <Link className="menu-link" href={item.path}>
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdditionalDrawer;