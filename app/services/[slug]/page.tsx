import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import ServiceList from '@/data/services.json';
import { ServiceProps } from '@/types/service';
import { notFound } from 'next/navigation';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import ServiceDetails from '@/components/sections/ServiceDetails';

const PAGE_TITLE: string = 'Service Details';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = ServiceList.find((s: ServiceProps) => s.slug === slug);
    return {
        title: service ? `${service.title} - Saanvi Technologies` : 'Service Details',
    };
}

const Page = async ({ params }: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const serviceList = ServiceList;

    const service: ServiceProps | undefined = serviceList.find(
        (service: ServiceProps) => service.slug === slug
    );

    const pageTitle: string = service?.title || PAGE_TITLE;

    return (
        <>
            <BreadcrumbBanner 
                title={pageTitle}
                image={{
                    src: BreadcrumbBannerImage.src,
                    srcMobile: BreadcrumbBannerImageTablet.src,
                    srcTablet: BreadcrumbBannerImageMobile.src,
                    width: 1920,
                    height: 520,
                    cls: "media media-bg",
                    alt: `${pageTitle} Banner`,
                    loading: "eager"
                }}
            />
            {service ? (
              <ServiceDetails container="container" data={service} />
            ) : (
              notFound()
            )}
        </>
    )
}

export default Page;