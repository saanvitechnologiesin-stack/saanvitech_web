import Icons from "../Icons";
import DrawerOpener from "../DrawerOpener";

const Hamburger = () => {
    return(
        <DrawerOpener cls="svg-wrapper menu-open lg:!hidden" data-drawer=".drawer-menu">
            <Icons.Hamburger />
        </DrawerOpener>
    )
}

export default Hamburger;