export interface ThemeButtonType {
    label: string;
    href?: string;
    cls?: string;
    ariaLabel?: string;
    showIcon?: boolean;
    type?: 'submit' | 'button' | 'reset';
}