import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import Projects from '@/data/projects.json';
import { ProjectType } from '@/types/project';
import { notFound } from 'next/navigation';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import ProjectDetails from '@/components/sections/ProjectDetails';

const PAGE_TITLE: string = 'Project Details';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const Page = async ({ params }: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const projects = Projects;
    const project: ProjectType | undefined = projects.find(
        (project: ProjectType) => project.slug === slug
    );

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

            {project ? (
              <ProjectDetails container="container" data={project} />
            ) : (
              notFound()
            )}
        </>
    )
}

export default Page;