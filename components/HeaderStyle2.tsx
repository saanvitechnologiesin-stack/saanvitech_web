import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
import NavBar from "./menus/NavBar";
import HeaderActions2 from "./HeaderActions2";
import AdditionalDrawer from "./AdditionalDrawer";
import StickyHeader from "./StickyHeader";

const Header2 = () => {
    return (
      <>
        <StickyHeader 
          wrapperCls="header-2 header-floating"
          container="container-fluid"
          stickyType= 'always'
        >
          <div className="header-grid">
            {/* Logo */}
            <Logo 
              src={LogoImage.src}
              width={145}
              height={50}
              url="/"
              cls="header-logo"
              alt="Saanvi Technologies logo"
              ariaLabel="Saanvi Technologies logo"
              loading="eager"
            />

            {/* Nav Bar */}
            <NavBar />

            {/* Header Actions */}
            <HeaderActions2 />
          </div>
        </StickyHeader>

        {/* Additional Drawer */}
        <AdditionalDrawer />
      </>
    )
}

export default Header2;