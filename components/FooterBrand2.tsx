import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.png";
import Social from "./Social";

const FooterBrand2 = () => {
    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-right"
            data-aos-anchor=".footer-top"
        >
            <Logo 
                src={LogoImage.src}
                width={189}
                height={32}
                url="/home-6"
                cls="footer-logo"
                alt="Consulo logo"
                ariaLabel="Consulo logo" 
                loading="lazy"
            />
            <Social 
                wrapperCls="social-icons"
            />
        </div>
    )
}

export default FooterBrand2;