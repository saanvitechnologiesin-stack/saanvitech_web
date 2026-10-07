import FooterBgImage from "@/public/img/footer/footer-bg-large.jpg";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyleGlobal = ({ container }: FooterProps) => {
    return (
        <div
            className="footer-main bg-contain"
            style={{ backgroundImage: `url(${FooterBgImage.src})` }}
        >
            <FooterTop container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyleGlobal;