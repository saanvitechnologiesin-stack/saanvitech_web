import "@/styles/meet-ceo.css";
import { MeetCeoDataType } from "@/data/sections/meetCeoData";
import Subheading from "../Subheading";
import Heading from "../Heading";
import Image from "next/image";
import Link from "next/link";
import Icons from "../Icons";

const MeetCeo = ({ data }: { data: MeetCeoDataType }) => {
    const {
        wrapperCls,
        container,
        subheading,
        heading,
        image,
        name,
        designation,
        bio,
        visionTitle,
        visionText,
        brochureUrl,
        social,
        stats,
    } = data || {};

    return (
        <section className={`meet-ceo ${wrapperCls || ""}`}>
            <div className={container || "container"}>
                <div className="section-headings headings-width text-center">
                    {subheading && (
                        <Subheading
                            title={subheading}
                            cls="text-20"
                            aos="fade-up"
                        />
                    )}

                    {heading && (
                        <Heading
                            title={heading}
                            cls="text-40"
                            aos="fade-up"
                        />
                    )}
                </div>

                <div className="meet-ceo-content" data-aos="fade-up">
                    <div className="meet-ceo-grid">
                        {/* Left Side: Modern Rounded CEO Profile Card */}
                        <div className="meet-ceo-image-wrap">
                            <div className="ceo-profile-card" data-aos="fade-right">
                                <div className="ceo-avatar-frame">
                                    <div className="ceo-avatar-inner">
                                        {image && (
                                            <Image
                                                src={image.src}
                                                width={image.width || 568}
                                                height={image.height || 568}
                                                loading={image.loading || "lazy"}
                                                alt={image.alt || name || "CEO Image"}
                                                className="ceo-avatar-img"
                                            />
                                        )}
                                    </div>
                                </div>

                                <h3 className="ceo-card-name">{name}</h3>
                                <p className="ceo-card-title">{designation}</p>

                                {stats && stats.length > 0 && (
                                    <div className="ceo-stats-row">
                                        {stats.map((stat, idx) => (
                                            <div key={idx} className="ceo-stat-item">
                                                <span className="ceo-stat-val">{stat.value}</span>
                                                <span className="ceo-stat-lbl">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {social && (
                                    <div className="ceo-card-social">
                                        {social.linkedin_url && (
                                            <Link
                                                href={social.linkedin_url}
                                                className="ceo-card-social-link"
                                                aria-label="LinkedIn Profile"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Connect on LinkedIn"
                                            >
                                                <Icons.LinkedIn className="icon icon-20" />
                                            </Link>
                                        )}
                                        {social.instagram_url && (
                                            <Link
                                                href={social.instagram_url}
                                                className="ceo-card-social-link"
                                                aria-label="Instagram Profile"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Follow on Instagram"
                                            >
                                                <Icons.Instagram className="icon icon-20" />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: CEO Biography, Vision & Action */}
                        <div className="meet-ceo-info">
                            <div className="meet-ceo-info-inner">
                                {/* <h3 className="heading text-36 fw-700 meet-ceo-name" data-aos="fade-left">
                                    {name}
                                </h3>

                                <p className="meet-ceo-designation text-20" data-aos="fade-left" data-aos-delay="100">
                                    {designation}
                                </p> */}

                                <div className="meet-ceo-tags" data-aos="fade-left" data-aos-delay="150">
                                    <span className="meet-ceo-tag">Saanvi Technologies</span>
                                    <span className="meet-ceo-tag">Zeeglo Software Pvt. Ltd.</span>
                                    <span className="meet-ceo-tag">Alumnus, BMSIT College</span>
                                </div>

                                <div className="meet-ceo-divider" data-aos="fade-left" data-aos-delay="200"></div>

                                {bio && (
                                    <p className="meet-ceo-bio text-18" data-aos="fade-left" data-aos-delay="250">
                                        {bio}
                                    </p>
                                )}

                                {visionText && (
                                    <div className="meet-ceo-vision-card" data-aos="fade-left" data-aos-delay="300">
                                        <div className="meet-ceo-vision-header">
                                            <Icons.Quote2 className="meet-ceo-quote-icon" />
                                            <h4 className="meet-ceo-vision-title">
                                                {visionTitle || "Vision & Leadership"}
                                            </h4>
                                        </div>
                                        <p className="meet-ceo-vision-text">
                                            {visionText}
                                        </p>
                                    </div>
                                )}

                                <div className="meet-ceo-actions" data-aos="fade-left" data-aos-delay="350">
                                    <a
                                        href={brochureUrl || "/broucher/Brochure.pdf"}
                                        download="Saanvi_Technologies_Brochure.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button button--primary download-brochure-btn"
                                        title="Download Company Brochure"
                                    >
                                        <Icons.Pdf className="icon icon-20" />
                                        <span>Download Brochure</span>
                                    </a>

                                    {social && (
                                        <div className="meet-ceo-social">
                                            {social.linkedin_url && (
                                                <Link
                                                    href={social.linkedin_url}
                                                    className="meet-ceo-social-link"
                                                    aria-label="LinkedIn"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="LinkedIn"
                                                >
                                                    <Icons.LinkedIn className="icon icon-20" />
                                                </Link>
                                            )}
                                            {social.instagram_url && (
                                                <Link
                                                    href={social.instagram_url}
                                                    className="meet-ceo-social-link"
                                                    aria-label="Instagram"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Instagram"
                                                >
                                                    <Icons.Instagram className="icon icon-20" />
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetCeo;
