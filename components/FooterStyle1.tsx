import FooterContact from "./FooterContact";
import FooterContactImage from "@/public/img/contact/contact.jpg";
import FooterContactBgImage from "@/public/img/contact/contact-bg.jpg";
import FooterBgImage from "@/public/img/footer/footer-bg-large.jpg";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {
    container: string;
}

const FooterStyle1 = ({ container }: FooterProps) => {
    return (
        <>
            <FooterContact 
                container={container}
                bgImage={FooterContactBgImage.src}
                imageUrl={FooterContactImage.src}
                width={1290}
                height={1400}
                alt="Contact image"
                aosAnchor=".contact-box"
                subheading="Contact Us"
                heading="Get free business consultation today"
                text="Need help with a project, have a question about our work? have a question about our work? We're here to help you."
            />

            <div
                className="footer-main bg-contain"
                style={{ backgroundImage: `url(${FooterBgImage.src})` }}
            >
                <FooterTop container={container} />
                <FooterBottom container={container} />
            </div></>
    )
}

export default FooterStyle1;