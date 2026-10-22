import SlimButton from "./buttons/SlimButton";
import Hamburger from "./menus/Hamburger";

const HeaderActions = () => {
    return (
        <div className="header-actions flex items-center">
            <SlimButton 
                label="Let's Talk"
                href="/contact-us"
                ariaLabel="contact us"
                cls="button--secondary !hidden lg:!inline-flex"
            />
            <Hamburger />
        </div>
    )
}

export default HeaderActions;