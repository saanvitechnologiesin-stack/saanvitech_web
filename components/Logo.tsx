import Image from "next/image";
import Link from 'next/link';
import { LogoType } from "@/types/logo";

const Logo = ({ 
    src, 
    url, 
    width, 
    height, 
    alt, 
    cls, 
    ariaLabel, 
    loading 
}: LogoType) => {
    return (
        <Link className={cls} href={url} aria-label={ariaLabel}>
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                loading={loading}
            />
        </Link>
    )
}

export default Logo;