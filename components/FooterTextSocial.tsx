import Logo from "./Logo";
import LogoImage from "@/public/img/logo-white.png";
import Social from "./Social";

const FooterTextSocial = () => {
    return (
        <div
            className="footer-widget footer-widget-brand"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            <h2 className="heading text-80">We scale dreams into reality</h2>
            <Social 
                wrapperCls="social-icons"
                aos="fade-up"
                aosAnchor=".footer-top"
            />
        </div>
    )
}

export default FooterTextSocial;