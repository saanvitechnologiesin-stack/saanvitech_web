import FooterBgImage from "@/public/img/footer/footer-bg-large.jpg";
import FooterTop2 from "./FooterTop2";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle2 = ({ container }: FooterProps) => {
    return (
        <div
            className="footer-main bg-contain"
            style={{ backgroundImage: `url(${FooterBgImage.src})` }}
        >
            <FooterTop2 container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyle2;