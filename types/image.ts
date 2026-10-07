export interface ImageProps {
    src: string,
    srcTablet?: string;
    srcMobile?: string;
    width?: number,
    height?: number,
    alt?: string,
    loading?: 'lazy' | 'eager',
    cls?: string;
    href?: string;
    title?: string;
}
