export interface MenuType {
    title: string;
    path: string;
    dropdown?: boolean;
    text?:string; 
    showbutton?: boolean; 
    altText?: string; 
    imageUrl?: string | null; 
    imageUrlMobile?: string | null;
    icon?: any;
}

export interface MenuItem {
    title: string;
    path: string;
    dropdown?: {
        title: string;
        path: string;
        dropdown?: {
            title: string;
            path: string;
        }[];
    }[];
    megamenu?: {
        heading: string;
        path: string;
        dropdown?: {
            title: string;
            path: string;
        }[];
    }[];
    megamenutwocolumn?: {
        title: string;
        path: string;
        dropdown?: {
            imageUrl?: string | null;
            imageUrlMobile?: string | null;
            title: string;
            text?: string;
            path: string;
            showbutton?: boolean;
        }[];
    }[];
    bottommenu?: {
        title: string;
        path: string;
        icon?: any;
    }[];
}

