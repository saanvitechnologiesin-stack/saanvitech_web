import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";

const FooterBrand = () => {
    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            <Logo 
                src={LogoImage.src}
                width={135}
                height={46}
                url="/"
                cls="footer-logo"
                alt="Saanvi Technologies logo"
                ariaLabel="Saanvi Technologies logo" 
                loading="lazy"
            />
            <p className="text text-16 footer-brand-desc">
                Saanvi Technologies delivers innovative digital solutions tailored to empower businesses with cutting-edge technology and expert-driven services.
            </p>
        </div>
    )
}

export default FooterBrand;