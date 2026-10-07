import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';

import { FaqWithContactFormData } from '@/data/sections/faqWithContactFormData';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import FaqWithContactForm from '@/components/sections/FaqWithContactForm';


const PAGE_TITLE: string = 'FAQS';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const Faq = () => {
    return(
        <>
            {/* Breadcrumb Banner */}
            <BreadcrumbBanner 
                title={PAGE_TITLE}
                image={{
                    src: BreadcrumbBannerImage.src,
                    srcMobile: BreadcrumbBannerImageTablet.src,
                    srcTablet: BreadcrumbBannerImageMobile.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: "Banner Image",
                    loading: "eager"
                }}
            />

            {/* FAQ */}
            <FaqWithContactForm data={FaqWithContactFormData} />
        </>
    )
}

export default Faq;