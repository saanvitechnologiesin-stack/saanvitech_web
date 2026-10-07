import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import TermsConditionSection from '@/components/sections/TermsCondition';

const PAGE_TITLE: string = 'Terms & Conditions';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const TermsCondition = () => {
    return(
        <>
            {/* Breadcrumb Banner  */}
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
            
            {/* Page */}
            <TermsConditionSection />
        </>
    )
}

export default TermsCondition;