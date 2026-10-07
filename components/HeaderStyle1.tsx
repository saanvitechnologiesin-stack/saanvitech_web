import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
import NavBar from "./menus/NavBar";
import HeaderActions from "./HeaderActions";
import StickyHeader from "./StickyHeader";

const Header = () => {
    return (
      <StickyHeader 
        wrapperCls="header-1 header-floating"
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
          <HeaderActions />
        </div>
      </StickyHeader>
    )
}

export default Header;