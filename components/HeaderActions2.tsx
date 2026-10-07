import SlimButton from "./buttons/SlimButton";
import Hamburger from "./menus/Hamburger";
import Icons from "./Icons";
import DrawerOpener from "./DrawerOpener";

const HeaderActions2 = () => {
    return (
        <div className="header-actions flex items-center">
            <SlimButton 
                label="Get in Touch"
                href="/contact-us"
                ariaLabel="contact us"
                cls="button--primary"
            />
            <Hamburger />
            
            <DrawerOpener
                cls="svg-wrapper menu-open !hidden lg:!flex" 
                data-drawer=".drawer-additional"
            >
                <Icons.Hamburger />
            </DrawerOpener>
        </div>
    )
}

export default HeaderActions2;