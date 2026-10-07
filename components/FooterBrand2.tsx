import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
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
                height={65}
                url="/"
                cls="footer-logo"
                alt="Saanvi Technologies logo"
                ariaLabel="Saanvi Technologies logo" 
                loading="lazy"
            />
            <Social 
                wrapperCls="social-icons"
            />
        </div>
    )
}

export default FooterBrand2;