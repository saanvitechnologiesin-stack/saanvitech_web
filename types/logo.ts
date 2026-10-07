export interface LogoType {
    src: string;
    url: string;
    width: number;
    height: number;
    alt: string;
    cls?: string;
    ariaLabel?: string;
    loading?: 'lazy' | 'eager';
}
