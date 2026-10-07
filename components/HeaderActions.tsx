import SlimButton from "./buttons/SlimButton";
import SearchModal from "./SearchModal";
import HeaderSeparator from "./HeaderSeparator";
import Hamburger from "./menus/Hamburger";

const HeaderActions = () => {
    return (
        <div className="header-actions flex items-center">
            <SearchModal title="Search" placeholder="What are you looking for?" />
            <HeaderSeparator />
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