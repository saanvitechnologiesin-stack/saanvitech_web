import FooterContact2 from "../FooterContact2";
import FooterContactImage from "@/public/img/contact/contact.jpg";

interface FooterProps {
    container: string;
}

const FooterContactForm = ({ container }: FooterProps) => {
    return (
        <>
            <FooterContact2
                container={container}
                imageUrl={FooterContactImage.src}
                width={1290}
                height={1400}
                alt="Contact image"
                aosAnchor=".contact-box"
                subheading="Contact Us"
                heading="Get free business consultation today"
                text="Need help with a project, have a question about our work? have a question about our work? We're here to help you."
            />
        </>
    )
}

export default FooterContactForm;