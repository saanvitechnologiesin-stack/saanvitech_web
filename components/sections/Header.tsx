'use client';

import { usePathname } from "next/navigation";
import HeaderStyle1 from '../HeaderStyle1';

const Header = () => {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <HeaderStyle1 />
    );
};

export default Header;