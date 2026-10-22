import type { Metadata } from "next";
import { fonts } from "@/libs/fonts";
import "@/styles/global.css";
import "@/styles/footer.css";
import "@/styles/modal.css";
import AosInitializer from "@/libs/aos";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: {
    template: '%s | Saanvi Technologies',
    default: 'Saanvi Technologies',
  },
  description: "Saanvi Technologies delivers innovative digital solutions tailored to empower businesses with cutting-edge technology and expert-driven services.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png' },
    ],
  },
  openGraph: {
    title: 'Saanvi Technologies',
    description: 'Saanvi Technologies delivers innovative digital solutions tailored to empower businesses with cutting-edge technology and expert-driven services.',
    url: 'https://saanvitechin.com',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Header />
        <main>{children}</main>
        <Footer />
        
        {/* Modal and Drawer Overlay */}
        <drawer-opener id="drawer-overlay"></drawer-opener>

        {/* AOS Init */}
        <AosInitializer />
        
        {/* Scroll to Top Button */}
        <ScrollTop />
      </body>
    </html>
  );
}
