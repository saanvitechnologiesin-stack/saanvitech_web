import SlimButton from "./buttons/SlimButton";
import Hamburger from "./menus/Hamburger";

const HeaderActions3 = () => {
    return (
        <div className="header-actions flex items-center">
            <SlimButton 
                label="Get a Quote"
                href="/contact-us"
                ariaLabel="contact us"
                cls="button--secondary button--slim hidden! lg:inline-flex!"
            />
            <Hamburger />
        </div>
    )
}

export default HeaderActions3;