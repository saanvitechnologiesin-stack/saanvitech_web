import '@/styles/team-details.css';
import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import TeamMemberList from '@/data/teams.json';
import { TeamMemberType } from '@/types/teamMember';
import { notFound } from 'next/navigation';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import TeamMemberDetails from '@/components/sections/TeamMemberDetails';

const PAGE_TITLE: string = 'Team Details';
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const Page = async ({ params }: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const teamMemberList = TeamMemberList;

    const teamMember: TeamMemberType | undefined = teamMemberList.find(
        (member: TeamMemberType) => member.slug === slug
    );

    return (
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

            {/* Team Member Details  */}
            {teamMember ? (
                <TeamMemberDetails 
                    container="container" 
                    data={teamMember} 
                />
            ) : (
              notFound()
            )}
        </>
    )
}

export default Page;