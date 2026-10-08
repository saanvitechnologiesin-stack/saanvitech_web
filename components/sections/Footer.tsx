'use client';

import "@/styles/form.css";
import "@/styles/footer.css";
import { usePathname } from "next/navigation";
import FooterStyle1 from "../FooterStyle1";
import FooterStyleGlobal from "../FooterStyleGlobal";

const Footer = () => {
    const pathname = usePathname();

    let container: string = 'container-fluid';
    let showFooterStyle1: boolean = false;
    let showFooterStyleGlobal: boolean = false;

    if(pathname == '/' || pathname == '/services') container = 'container';

    if(pathname == '/services') {
        showFooterStyle1 = true;
    } else {
        showFooterStyleGlobal = true;
    }

    return (
        <footer>
            {showFooterStyle1 && <FooterStyle1 container={container} />}
            {showFooterStyleGlobal && <FooterStyleGlobal container={container} />}
        </footer>
    )
}

export default Footer;