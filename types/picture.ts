export interface PictureType {
    image: {
        cls?: string;
        src: string,
        srcTablet?: string;
        srcMobile?: string;
        width?: number,
        height?: number,
        alt?: string,
        loading?: 'lazy' | 'eager',
    }
}