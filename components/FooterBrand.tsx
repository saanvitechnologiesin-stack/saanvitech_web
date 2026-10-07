import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.webp";
import Social from "./Social";

const FooterBrand = () => {
    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-up"
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
            <p className="text text-16">
                Each demo built with Teba will look different. You can customize almost anything in the appearance of your website with only a few
            </p>
            <Social 
                wrapperCls="social-icons"
                aos="fade-up"
                aosAnchor=".footer-top"
            />
        </div>
    )
}

export default FooterBrand;