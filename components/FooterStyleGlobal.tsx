import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyleGlobal = ({ container }: FooterProps) => {
    return (
        <div className="footer-main">
            <FooterTop container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyleGlobal;