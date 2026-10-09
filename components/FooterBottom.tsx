'use client';

import LinkList from "./LinkList";
interface FooterBottomProps {
    container: string;
}

const FooterBottom = ({
    container
}: FooterBottomProps) => {
    const currentYear = new Date().getFullYear();

    return(
        <div className="footer-bottom">
            <div className={container}>
                <div className="grid grid-cols-2 md:gap-1 footer-bottom-row">
                    <div className="col-span-2 md:col-span-2">
                        <div className="footer-copyright text text-16 text-center">
                            Copyright © {currentYear} Saanvi Technologies. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBottom;