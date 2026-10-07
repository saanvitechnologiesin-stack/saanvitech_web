import "@/styles/running-content.css";
import { SectionProps } from "@/types/sectionProps";
import Heading from "../Heading";
import Link from "next/link";
import Image from "next/image";

const TrustedBrands = ({ data }: { data: SectionProps }) => {
  const { wrapperCls, container, heading, imageList } = data || {};

  return (
    <>
      <div className={`brand brand-bg section-padding ${wrapperCls}`}>
        <div className={container}>
          <div className="section-headings text-center" data-aos="fade-up">
            {heading && <Heading title={heading} cls="text-50" aos="fade-up" />}
          </div>
          <div className="section-content">
            <div className="grid grid-cols-12 gap-1 product-grid">
              {imageList &&
                imageList.map((item, index) => (
                  <div
                    className="lg:col-span-3 sm:col-span-4 col-span-6"
                    key={`scroll-img-${index}`}
                  >
                    <div className="brand-logo" data-aos="fade-up">
                      <Link
                        href={item.href ? item.href : ""}
                        className="content-link"
                      >
                        <Image
                          src={item.src}
                          width={item.width}
                          height={item.height}
                          loading={item.loading}
                          alt={item.alt ? item.alt : "Brand image"}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustedBrands;
