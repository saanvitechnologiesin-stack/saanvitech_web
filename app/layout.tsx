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
    template: '%s',
    default: 'Consulo Creative Business Consulting Template',
  },
  description: "Consulo is a creative business consulting template designed for corporate entities and professional businesses.",
  openGraph: {
    title: 'Consulo Creative Business Consulting Template',
    description: 'A versatile HTML template designed for corporate entities and professional businesses.',
    url: 'https://themeforest.net/user/spreethemes/portfolio',
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
