'use client';

import { usePathname } from 'next/navigation';
import "@/styles/header.css";
import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
import NavBar from "./menus/NavBar";
import HeaderActions3 from "./HeaderActions3";
import StickyHeader from "./StickyHeader";

const Header4 = () => {

  const pathname = usePathname();

    return (
      <>
        <StickyHeader 
          wrapperCls="header-4 header-1 header-floating"
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
            <HeaderActions3 />
          </div>
        </StickyHeader>
      </>
    )
}

export default Header4;