import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BlogGrid from '@/components/sections/BlogGrid';

const PAGE_TITLE: string = 'Our Blog';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const Blog = () => {
    return(
        <>
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
            <BlogGrid cls="mt-100 mb-100" />
        </>
    )
}

export default Blog;