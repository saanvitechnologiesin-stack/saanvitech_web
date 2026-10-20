import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import Projects from '@/components/sections/Projects';


const PAGE_TITLE: string = 'Our Products';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const PageProjects = () => {
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

            {/* Project Cards */}
            <Projects 
                wrapperCls="mt-100 mb-100"
                container="container-fluid"
                heading="Featured Solutions We've Built"
                text="We design and deliver software solutions tailored to specific industries and challenges. From construction management tools to business automation platforms, our products are built to perform — and scale with you."
            />
        </>
    )
}

export default PageProjects;