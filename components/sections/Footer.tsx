'use client';

import "@/styles/form.css";
import "@/styles/footer.css";
import { usePathname } from "next/navigation";
import FooterStyleGlobal from "../FooterStyleGlobal";

const Footer = () => {
    const pathname = usePathname();

    let container: string = 'container-fluid';
    if (pathname === '/' || pathname === '/services') container = 'container';

    return (
        <footer>
            <FooterStyleGlobal container={container} />
        </footer>
    );
};

export default Footer;