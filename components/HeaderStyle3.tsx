'use client';

import { usePathname } from 'next/navigation';
import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
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
              width={145}
              height={50}
              url={pathname}
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

export default Header3;