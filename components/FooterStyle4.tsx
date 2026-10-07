import FooterBgImage from "@/public/img/footer/footer-bg-large.jpg";
import FooterTop4 from "./FooterTop4";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
    cls?:string
}

const FooterStyle4 = ({ container, cls }: FooterProps) => {
    return (
        <div
            className={`footer-main footer-2 bg-contain ${cls}`}
            style={{ backgroundImage: `url(${FooterBgImage.src})` }}
        >
            <FooterTop4 container={container} />
            <FooterBottom container={container} />
        </div>
    )
}

export default FooterStyle4;