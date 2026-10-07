import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import { createHandle } from '@/utils/createHandle';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BlogTags from '@/components/sections/BlogTags';

const PAGE_TITLE: string = 'Tags';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

interface TagProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: TagProps) => {
    const { slug } = await params;
    const handle = createHandle(slug);

    return (
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
            <BlogTags slug={handle} />
        </>
    )
}

export default Page;