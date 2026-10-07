import { Inter, Poppins } from 'next/font/google';
 
export const inter = Inter({ 
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-body--family'
});
 
export const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-heading--family'
});
 
export const poppinsButton = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-button--family'
});

export const fonts = [inter, poppins, poppinsButton].map(font => font.variable).join(" ");