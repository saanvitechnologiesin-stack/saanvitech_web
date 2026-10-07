'use client';

import { usePathname } from 'next/navigation';
import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.png";
import NavBar from "./menus/NavBar";
import HeaderActions2 from "./HeaderActions2";
import AdditionalDrawer from "./AdditionalDrawer";
import StickyHeader from "./StickyHeader";

const Header3 = () => {

  const pathname = usePathname();

    return (
      <>
        <StickyHeader 
          wrapperCls="header-3 header-sticky"
          container="container-fluid"
          stickyType= 'always'
        >
          <div className="header-grid">
            {/* Logo */}
            <Logo 
              src={LogoImage.src}
              width={189}
              height={32}
              url={pathname}
              cls="header-logo"
              alt="Consulo logo"
              ariaLabel="Consulo logo"
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

export default Header3;