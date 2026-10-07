'use client';

import "@/styles/form.css";
import "@/styles/footer.css";
import { usePathname } from "next/navigation";
import FooterStyle1 from "../FooterStyle1";
import FooterStyle2 from "../FooterStyle2";
import FooterStyle3 from "../FooterStyle3";
import FooterStyle4 from "../FooterStyle4";
import FooterStyleGlobal from "../FooterStyleGlobal";


const Footer = () => {
    const pathname = usePathname();

    let container: string = 'container-fluid';
    let cls: string = 'mt-100'
    let showFooterStyle1: boolean = false;
    let showFooterStyle2: boolean = false;
    let showFooterStyle3: boolean = false;
    let showFooterStyle4: boolean = false;
    let showFooterStyleGlobal: boolean = false;

    if(pathname == '/' || pathname == '/services') container = 'container';
    if (pathname == '/home-9') cls = '';

    if(pathname == '/' || pathname == '/services') {
        showFooterStyle1 = true;
    } else if (pathname == '/home-4') {
        showFooterStyle2 = true;
    } else if (pathname == '/home-5' || pathname == '/home-7') {
        showFooterStyle3 = true;
    } else if (pathname == '/home-6' || pathname == '/home-9') {
        showFooterStyle4 = true;
    } else {
        showFooterStyleGlobal = true;
    }

    return (
        <footer>
            {showFooterStyle1 && <FooterStyle1 container={container} />}
            {showFooterStyle2 && <FooterStyle2 container={container} />}
            {showFooterStyle3 && <FooterStyle3 container={container} />}
            {showFooterStyle4 && <FooterStyle4 container={container} cls={cls} />}
            {showFooterStyleGlobal && <FooterStyleGlobal container={container} />}
        </footer>
    )
}

export default Footer;