import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.png";
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
            width={189}
            height={32}
            url="/"
            cls="header-logo"
            alt="Consulo logo"
            ariaLabel="Consulo logo"
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