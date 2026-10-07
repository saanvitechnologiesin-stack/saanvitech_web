import '@/styles/error.css';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import BreadcrumbBannerImageTablet from '@/public/img/banner/page-banner-991.jpg';
import BreadcrumbBannerImageMobile from '@/public/img/banner/page-banner-575.jpg';
import Icons from '@/components/Icons';

const PAGE_TITLE: string = 'Error';

export const metadata: Metadata = {
  title: PAGE_TITLE,
}
 
export default function NotFound() {
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

            <div className="section-error section-padding">
              <div className="container">
                <div className="section-headings text-center">
                  <div className="error-media" data-aos="zoom-in-up">
                    <Image
                      src="/img/error/error.png"
                      alt="404 error image"
                      width={658}
                      height={277}
                      loading="lazy"
                    />
                  </div>

                  <p className="text text-18" data-aos="fade-up">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist. If you think something is broken, report a porblem. 
                  </p>

                  <div className="buttons" data-aos="fade-up">
                    <Link
                      href="/"
                      className="button button--primary"
                      aria-label="Back to Home"
                    >
                      Back to Home
                      <span className="svg-wrapper">
                        <Icons.ArrowCircle />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </>
    )
}