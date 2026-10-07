import Image from "next/image";
import { PictureType } from "@/types/picture";

const Picture = ({ image }: PictureType) => {
    const {
        cls, 
        src, 
        srcMobile, 
        srcTablet, 
        width,
        height,
        loading,
        alt
    } = image;
    return(
        <picture className={cls ?  cls : ''}>
            {srcMobile && <source media="(max-width: 575px)" srcSet={srcMobile} />}
            {srcTablet && <source media="(max-width: 991px)" srcSet={srcTablet} />}
            <Image
                src={src}
                width={width}
                height={height}
                loading={loading}
                alt={alt ? alt : 'Image'}
            />
        </picture>
    )
}

export default Picture;