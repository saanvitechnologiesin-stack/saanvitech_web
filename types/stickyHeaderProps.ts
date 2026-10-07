export interface StickyHeaderProps {
    wrapperCls?: string;
    container?: string;
    stickyType?: "always" | "reduce-logo-size";
    children: React.ReactNode;
}