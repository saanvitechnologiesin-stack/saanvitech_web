import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/services-banner.jpg';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import Services from '@/components/sections/Services';

const PAGE_TITLE: string = 'Our Services';
export const metadata: Metadata = {
    title: PAGE_TITLE,
}

const PageServices = () => {
    return (
        <>
            {/* Breadcrumb Banner */}
            <BreadcrumbBanner
                title={PAGE_TITLE}
                image={{
                    src: BreadcrumbBannerImage.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: "Our Services Banner",
                    loading: "eager"
                }}
            />

            {/* Service Cards */}
            <Services
                wrapperCls="mt-100 mb-100"
                container="container"
            />
        </>
    )
}

export default PageServices;